// src/pages/ImproveResume.tsx
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, BarChart3, ListChecks, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ImproveResume = () => {
  const { confidenceScore, bulletinPoints, goodVerdict } = useSelector(
    (state: RootState) => state.jdAnalysis
  );

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-neural-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl animate-neural-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Resume Analysis
          </h1>
        </div>

        {/* Single Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full w-fit">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Resume Confidence & Improvements
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your resume’s confidence score and suggestions to align with the JD
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Confidence Score */}
              <div className="text-center">
                <p className="text-6xl font-extrabold text-indigo-600">
                  {confidenceScore ? (confidenceScore * 100).toFixed(2) + "%" : "N/A"}
                </p>
                <p className="mt-2 text-muted-foreground">Confidence Score</p>
              </div>

              {/* Key Points */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-foreground text-center">
                  Key Improvement Points
                </h2>
                {bulletinPoints?.length > 0 ? (
                  <ul className="space-y-3 text-left">
                    {bulletinPoints.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start space-x-2 text-muted-foreground"
                      >
                        <Sparkles className="h-5 w-5 text-accent mt-0.5" />
                        <span className="text-lg">{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-400">{goodVerdict}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImproveResume;
