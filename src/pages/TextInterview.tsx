import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { speakText } from "@/utils/speakText";

const TextInterview = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();
  const socketRef = useRef<WebSocket | null>(null);
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [botSpeaking, setBotSpeaking] = useState<boolean>(false);
  let firstTime: boolean = false;

  const resumeId = decodeURIComponent(new URLSearchParams(location.search).get("resumeId") || "");

  useEffect(() => {
    if (!resumeId) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
  let wsUrl: string;

  if (window.location.hostname === "localhost") {
    wsUrl = `${protocol}://localhost:8000?resumeId=${resumeId}`;
  } else {
    wsUrl = `${protocol}://${window.location.host}/ws/?resumeId=${resumeId}`;
  }
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");

    socket.onmessage = (event) => {
      if (!firstTime) {
        firstTime = true;
        setLoading(false);
      }
      const { type, data } = JSON.parse(event.data);
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      if (type === "question" || type === "system") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: data,
            sender: "ai",
            timestamp,
          },
        ]);
        setBotSpeaking(true);
        speakText(data, {
          onStart: () => setBotSpeaking(true),
          onEnd: () => setBotSpeaking(false),
        });
      } else if (type === "done") {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: "✅ Interview completed.",
            sender: "ai",
            timestamp,
          },
        ]);
        socket.close();
      }
    };

    socket.onerror = (err) => console.error("WebSocket error", err);
    socket.onclose = () => console.log("WebSocket closed");

    return () => {
      socket.close();
    };
  }, [resumeId]);

  const handleExitInterview = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
       console.log("WebSocket closed due to exit interview");
    }
    
    navigate("/dashboard");
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const userMessage = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);

    socketRef.current?.send(
      JSON.stringify({
        type: "answer",
        data: newMessage,
      })
    );

    setNewMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/interview")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">AI Interview Assistant</h2>
          <p className="text-sm text-muted-foreground">Online • Ready to help</p>
        </div>
        <Button
          variant="outline"
          onClick={handleExitInterview}
          className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          Exit Interview
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {loading ? (
          // Loading UI stays same
          <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
            <div>
              <p className="mb-4 text-lg">Your interview session is being prepared</p>
              <div className="flex space-x-1 justify-center">
                <span className="animate-bounce text-2xl">•</span>
                <span className="animate-bounce text-2xl [animation-delay:0.15s]">
                  •
                </span>
                <span className="animate-bounce text-2xl [animation-delay:0.3s]">
                  •
                </span>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Left half - bot icon */}
            <div className="w-1/2 flex items-center justify-center border-r">
              <div className="flex flex-col items-center">
                <div className="h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-16 w-16 text-primary animate-pulse" />
                </div>
                <p className="mt-4 text-muted-foreground">AI Interviewer</p>
              </div>
            </div>

            {/* Right half - messages & input */}
            <div className="w-1/2 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-muted text-foreground rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={botSpeaking ? "Bot is speaking..." : "Type your message..."}
                    className="flex-1"
                    disabled={botSpeaking}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TextInterview;
