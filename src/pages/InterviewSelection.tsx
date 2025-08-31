import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mic, ArrowLeft, Sparkles, Brain, Target } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const InterviewSelection = () => {
  const navigate = useNavigate();

  const handleTextChat = () => {
    // Navigate to text chat interview
    navigate('/interview/text');
  };

  const handleVoiceChat = () => {
    // Navigate to voice chat interview  
    navigate('/interview/voice');
  };

  return (
    <div className="max-h-[90vh] ">
      {/* Centered Header */}
      <div className="flex flex-col items-center justify-center mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          AI TUTOR
        </h1>
        <p className="text-muted-foreground mt-2">Choose Your Interview Mode</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg mb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground mb-2">
              Ready for Your AI Interview?
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Your resume has been analyzed. Choose how you'd like to practice your interview skills
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Interview Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Chat Option */}
              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Text Chat</h3>
                    <p className="text-muted-foreground mb-4">
                      Practice with our AI interviewer through text-based conversation
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">Type your responses</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">Take your time to think</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-muted-foreground">Perfect for detailed answers</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleTextChat}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Text Interview
                  </Button>
                </CardContent>
              </Card>

              {/* Voice Chat Option */}
              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="p-4 rounded-full bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                      <Mic className="h-8 w-8 text-secondary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Voice Chat</h3>
                    <p className="text-muted-foreground mb-4">
                      Have a realistic conversation with our AI interviewer using voice
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="text-muted-foreground">Speak naturally</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="text-muted-foreground">Real-time interaction</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                        <span className="text-muted-foreground">Practice verbal skills</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleVoiceChat}
                    className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-secondary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Voice Interview
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Features Section */}
            <div className="border-t border-border/50 pt-6">
              <h3 className="font-semibold text-foreground mb-4 text-center">What to Expect</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { 
                    icon: Brain, 
                    title: "AI-Powered Questions", 
                    desc: "Tailored questions based on your resume and experience",
                    color: "primary" 
                  },
                  { 
                    icon: Sparkles, 
                    title: "Real-time Feedback", 
                    desc: "Get instant insights on your responses and areas to improve",
                    color: "secondary" 
                  },
                  { 
                    icon: Target, 
                    title: "Personalized Tips", 
                    desc: "Receive customized advice to enhance your interview skills",
                    color: "accent" 
                  }
                ].map(({ icon: Icon, title, desc, color }, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4 rounded-lg hover:bg-accent/5 transition-colors">
                    <div className={`p-3 rounded-full bg-${color}/10`}>
                      <Icon className={`h-6 w-6 text-${color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to Upload */}
            <div className="flex justify-center pt-4">
              <Link to="/upload">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Upload
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InterviewSelection;