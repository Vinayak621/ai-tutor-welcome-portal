import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, User, Lock, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters long.",
        duration: 3000
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Registration failed");
    }

    toast({
      title: "Account created successfully!",
      description: "Welcome to AI Tutor. Redirecting to upload your resume...",
      duration: 2000 
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);

    setFormData({ name: "", email: "", password: "" });
  } catch (error: any) {
    toast({
      title: "Registration failed",
      description: error.message || "Something went wrong. Please try again.",
      variant: "destructive",
    });
  }
};

 const responseGoogle=async (authResult)=>{
      try {
        if(authResult['code']) {
          const response = await api.get(`/api/auth/google?code=${authResult['code']}`);
          console.log("user data",response.data.user);
           setTimeout(() => {
            navigate("/dashboard");
          }, 1500);
        }
        
      } catch (error) {
        console.error("Google sign-in error:", error);
      }
    }

  // const handleGoogleSignUp = useGoogleLogin({
  //   onSuccess: responseGoogle,
  //   onError: responseGoogle,
  //   flow: "auth-code",
  // });

  const handleGoogleSignUp = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-card animate-slide-in-right">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Join AI Tutor</h2>
            <p className="text-muted-foreground">Create your account and start learning</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Email field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-input/50 border-border/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-input/50 border-border/50 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>

            {/* Submit button */}
            <Button type="submit" variant="ai" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          {/* Google sign-up */}
          <Button 
            type="button" 
            variant="outline_ai" 
            size="lg" 
            className="w-full"
            onClick={handleGoogleSignUp}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          {/* Login link */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button className="text-primary hover:text-primary-glow transition-colors font-medium" onClick={() => navigate('/login')}>
              Sign in
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};