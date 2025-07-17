import { Brain, Sparkles, Target } from "lucide-react";
import heroImage from "@/assets/ai-tutor-hero.jpg";

export const HeroSection = () => {
  return (
    <div className="flex-1 flex flex-col justify-center p-8 lg:p-12 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30"></div>
      
      <div className="relative z-10 max-w-xl">
        {/* Logo and title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-primary shadow-glow">
            <Brain className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent animate-fade-in">
            AI TUTOR
          </h1>
        </div>

        {/* Main headline */}
        <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight animate-fade-in">
          Your Personal AI Learning Companion
        </h2>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed animate-fade-in">
          Experience the future of education with our advanced AI tutor. Get personalized learning paths, 
          instant feedback, and 24/7 support tailored to your unique learning style.
        </p>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-2 rounded-lg bg-primary/20">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="text-foreground">Personalized learning experience</span>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-2 rounded-lg bg-secondary/20">
              <Target className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-foreground">Adaptive curriculum & progress tracking</span>
          </div>
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="p-2 rounded-lg bg-accent/20">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <span className="text-foreground">AI-powered insights & recommendations</span>
          </div>
        </div>

        {/* Hero image - mobile only */}
        <div className="lg:hidden mb-8">
          <img 
            src={heroImage} 
            alt="AI Tutor Technology" 
            className="w-full h-48 object-cover rounded-xl shadow-card"
          />
        </div>

        {/* CTA for mobile */}
        <div className="lg:hidden">
          <p className="text-muted-foreground text-center">
            Ready to transform your learning journey? Sign up now! →
          </p>
        </div>
      </div>

      {/* Large hero image - desktop only */}
      <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-80 opacity-60">
        <img 
          src={heroImage} 
          alt="AI Tutor Technology" 
          className="w-full h-full object-cover rounded-l-2xl"
        />
      </div>
    </div>
  );
};