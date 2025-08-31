export const speakText = async (text: string, {
    onStart,
    onEnd,
  }: {
    onStart?: () => void;
    onEnd?: () => void;
  } = {}): Promise<void> => {
  if (!text || typeof text !== "string") return;
  
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported');
    return;
  }

  // CRITICAL FIX: Cancel any pending speech and reset state
  speechSynthesis.cancel();
  
  // Wait a bit for the cancel to take effect
  await new Promise(resolve => setTimeout(resolve, 100));

  const voices = await getVoices();
  if (voices.length === 0) {
    console.warn('No voices available');
    return;
  }

  const voice = selectBestVoice(voices);
  const chunks = splitTextIntoChunks(text, 200);

  if(onStart) onStart();
  
  for (let i = 0; i < chunks.length; i++) {
    // Add delay between chunks to prevent queue issues
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    await speakChunk(chunks[i], voice);
  }
   if (onEnd) onEnd();
};


const getVoices = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise(resolve => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      resolve(voices);
    } else {
      speechSynthesis.addEventListener('voiceschanged', () => {
        resolve(speechSynthesis.getVoices());
      }, { once: true });
    }
  });
};

const selectBestVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null => {
  // Prefer neural or high-quality voices
  const neural = voices.find(v => v.name.includes('Neural') && v.lang.startsWith('en'));
  const premium = voices.find(v => v.name.includes('Premium') && v.lang.startsWith('en'));
  const defaultEn = voices.find(v => v.lang.startsWith('en') && v.default);
  const anyEn = voices.find(v => v.lang.startsWith('en'));
  
  return neural || premium || defaultEn || anyEn || voices[0] || null;
};

const speakChunk = (text: string, voice: SpeechSynthesisVoice | null): Promise<void> => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voice) utterance.voice = voice;
    utterance.lang = "en-US";
    utterance.rate = 0.9; // Slightly slower for better clarity
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onend = () => resolve();
    utterance.onerror = (error) => reject(error);
    
    speechSynthesis.speak(utterance);
  });
};

const splitTextIntoChunks = (text: string, maxLength: number): string[] => {
  const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';
  
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxLength) {
      currentChunk += sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk.trim());
  return chunks;
};
