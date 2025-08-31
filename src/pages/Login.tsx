import { HeroSection } from "@/components/HeroSection";
import { LoginForm } from "@/components/LoginForm";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {

      const GoogleAuthWrapper = () => {
        return (
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LoginForm></LoginForm>
          </GoogleOAuthProvider>
        );
      };
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <HeroSection />
      <GoogleAuthWrapper />
    </div>
  );
};

export default Login;