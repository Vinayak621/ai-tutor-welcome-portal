import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type Question = {
  question: string;
  answer: string;
  responseTime: string;
  status: string;
};

// Updated type for single session response from API
type SessionDetails = {
  sessionId: string;
  resumeId: string;
  resumeName: string;
  startedAt: string;
  completedAt: string;
  score: number;
  status: string;
  questions: Question[];
};

const InterviewDetails = () => {
  const [sessionData, setSessionData] = useState<SessionDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { _id } = useParams<{ _id: string }>();
  
  console.log("Session ID from URL:", _id);

  useEffect(() => {
    if (!_id) {
      toast({
        title: "Error",
        description: "Session ID not found in the URL.",
        duration: 2000
      });
      navigate("/dashboard");
      return;
    }

    const fetchSessionDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview/session/${_id}`, {
          credentials: "include"
        });

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Interview session not found");
          }
          throw new Error("Failed to fetch interview session");
        }

        const data: SessionDetails = await res.json();
        setSessionData(data);
      } catch (error) {
        console.error("Error fetching session details:", error);
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Could not load interview session details.",
          duration: 2000
        });
        // Optionally navigate back on error
        // navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [_id, navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-background">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">Interview Details</h2>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>

        {/* Loading Body */}
        <div className="flex flex-1 items-center justify-center text-center text-muted-foreground">
          <div>
            <p className="mb-4 text-lg">Loading interview details...</p>
            <div className="flex space-x-1 justify-center">
              <span className="animate-bounce text-2xl">•</span>
              <span className="animate-bounce text-2xl [animation-delay:0.15s]">•</span>
              <span className="animate-bounce text-2xl [animation-delay:0.3s]">•</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!sessionData) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <div className="flex items-center gap-4 p-4 border-b bg-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h2 className="font-semibold text-lg">Interview Details</h2>
            <p className="text-sm text-muted-foreground">Error loading data</p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground">Interview session not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 border-b bg-card">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h2 className="font-semibold text-lg">Interview Details</h2>
          <p className="text-sm text-muted-foreground">{sessionData.resumeName}</p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Single Session Details */}
          <div className="bg-card rounded-lg border p-6">
            {/* Session Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">Interview Session</h3>
                <p className="text-sm text-muted-foreground">
                  Started: {formatDate(sessionData.startedAt)}
                </p>
                {sessionData.completedAt && (
                  <p className="text-sm text-muted-foreground">
                    Completed: {formatDate(sessionData.completedAt)}
                  </p>
                )}
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">{sessionData.score} out of 10</div>
                <p className="text-sm text-muted-foreground">Final Score</p>
                <span 
                  className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    sessionData.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {sessionData.status}
                </span>
              </div>
            </div>

            {/* Questions and Answers */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Questions & Answers</h4>
              {sessionData.questions.map((qa, qaIndex) => (
                <div key={qaIndex} className="bg-muted/50 rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <h5 className="font-medium text-sm text-muted-foreground">
                      Question {qaIndex + 1}
                    </h5>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground">
                        Response Time: {qa.responseTime}
                      </span>
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          qa.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {qa.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm mb-1">Question:</p>
                      <p className="text-foreground">{qa.question}</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-sm mb-1">Answer:</p>
                      <p className="text-foreground bg-background rounded p-3 border">
                        {qa.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
