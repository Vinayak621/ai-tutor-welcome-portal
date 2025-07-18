import { HeroSection } from "@/components/HeroSection";
import { LoginForm } from "@/components/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <HeroSection />
      <LoginForm />
    </div>
  );
};

export default Login;