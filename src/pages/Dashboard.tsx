import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Brain, Mic, ArrowLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link to="/upload">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                AI TUTOR
              </h1>
              <p className="text-muted-foreground">Your AI-Powered Career Assistant</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Resume Successfully Uploaded!
            </h2>
            <p className="text-muted-foreground">
              Choose how you'd like to proceed with your career development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Generate Summary Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-fit group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Generate Summary
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Get AI-powered insights and analysis of your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Summary
                </Button>
              </CardContent>
            </Card>

            {/* Training Exercise Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-full w-fit group-hover:from-secondary/20 group-hover:to-accent/20 transition-all duration-300">
                  <Brain className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Start Training
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Begin interactive exercises to improve your skills
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Start Training
                </Button>
              </CardContent>
            </Card>

            {/* Voice Chat Card */}
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full w-fit group-hover:from-accent/20 group-hover:to-primary/20 transition-all duration-300">
                  <Mic className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-bold text-foreground">
                  Voice Training
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Practice with AI voice assistant for real-time feedback
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  className="w-full bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Start Voice Chat
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              All features are powered by advanced AI to provide personalized career guidance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;