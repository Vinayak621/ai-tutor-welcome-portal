import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, Chrome } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { api } from "./RegisterForm";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
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

    if (!formData.email || !formData.password) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Login failed");
      }

      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to upload..."
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      toast({
        title: "Login Failed",
        description: err.message || "Something went wrong",
        variant: "destructive"
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

    // const handleGoogleSignIn = useGoogleLogin({
    //   onSuccess: responseGoogle,
    //   onError: responseGoogle,
    //   flow: "auth-code",
    // });

  const handleGoogleSignIn=()=>{
    window.location.href = "http://localhost:3000/api/auth/google";
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
      <Card className="w-full max-w-md bg-gradient-card border-border/50 shadow-card animate-slide-in-right">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <Lock className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your AI Tutor account</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
            </div>

            <Button type="submit" variant="ai" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline_ai" 
            size="lg" 
            className="w-full"
            onClick={handleGoogleSignIn}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button 
              onClick={() => navigate('/')}
              className="text-primary hover:text-primary-glow transition-colors font-medium"
            >
              Sign up
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
