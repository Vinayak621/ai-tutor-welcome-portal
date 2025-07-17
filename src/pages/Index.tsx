import { HeroSection } from "@/components/HeroSection";
import { RegisterForm } from "@/components/RegisterForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <HeroSection />
      <RegisterForm />
    </div>
  );
};

export default Index;
