import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mic, ArrowLeft, Sparkles, Brain } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Interview = () => {
  const navigate = useNavigate();

  const handleTextChat = () => {
    navigate("/text-interview");
  };

  const handleVoiceChat = () => {
    // Navigate to voice-based interview
    console.log('Starting voice chat interview...');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-neural-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl animate-neural-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI INTERVIEW
              </h1>
              <p className="text-muted-foreground">Choose your preferred interview format</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">
                Ready to Start Your Interview
              </h2>
              <Sparkles className="h-6 w-6 text-secondary" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your resume has been analyzed. Choose between text-based or voice-based interview to practice 
              with our AI interviewer and get personalized feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Text Chat Interview */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-fit group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <MessageSquare className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Text Interview
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Practice with AI through written conversation. Perfect for thoughtful responses and detailed feedback.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-tech-green rounded-full" />
                    <span>Type your responses at your own pace</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-tech-green rounded-full" />
                    <span>Get detailed written feedback</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-tech-green rounded-full" />
                    <span>Review conversation history</span>
                  </div>
                </div>
                <Button 
                  onClick={handleTextChat}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Start Text Interview
                </Button>
              </CardContent>
            </Card>

            {/* Voice Chat Interview */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full w-fit group-hover:from-secondary/20 group-hover:to-accent/20 transition-all duration-300">
                  <Mic className="h-10 w-10 text-secondary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Voice Interview
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Experience realistic voice-based interviews. Great for practicing verbal communication and confidence.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-ai-cyan rounded-full" />
                    <span>Natural conversation flow</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-ai-cyan rounded-full" />
                    <span>Practice verbal delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-ai-cyan rounded-full" />
                    <span>Real-time voice feedback</span>
                  </div>
                </div>
                <Button 
                  onClick={handleVoiceChat}
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice Interview
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
              <Brain className="h-4 w-4" />
              <span>Both formats use AI trained on your specific resume and job requirements</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;