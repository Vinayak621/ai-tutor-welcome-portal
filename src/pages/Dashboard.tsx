import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import UploadPage from "./Upload";

type InterviewSession = {
  _id:string
  resumeId: string;
  resumeName: string;
  sessions: {
    _id:string;
    sessionId: string;
    startedAt: string;
    score: number;
    questions: {
      question: string;
      answer: string;
      responseTime: string;
      status: string;
    }[];
  }[];
};

const Dashboard = () => {
  const [interviews, setInterviews] = useState<InterviewSession[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const fetchInterviews = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview/completed`, {
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to fetch interview sessions");

      const data = await res.json();
      console.log(data);
      setInterviews(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not load interview sessions.",
        duration: 2000
      });
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  const handleDelete = async (sessionId: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview-session/${sessionId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (!res.ok) throw new Error("Delete failed");

      toast({
        title: "Deleted",
        description: "Interview session deleted successfully",
        duration: 2000
      });

      // Remove session from state
      setInterviews(prev =>
        prev.map(group => ({
          ...group,
          sessions: group.sessions.filter(s => s.sessionId !== sessionId)
        })).filter(group => group.sessions.length > 0)
      );
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not delete interview session",
        duration: 2000
      });
    }
  };

  const backToLogin = async() => {
    try {
      const response =await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
      method: "POST",
      credentials: "include"
    }); 
    if(response.status === 200) {
      navigate("/login");
    }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  const deleteOperation = (e: React.MouseEvent<HTMLTableCellElement>, sessionId: string) => {
    e.stopPropagation();
    handleDelete(sessionId);
  };

  const InterviewDetails=(sessionId:string)=> {
    navigate(`/interview-details/${sessionId}`);
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Your Interviews</h1>
        <div className="flex gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>New Interview</Button>
            </DialogTrigger>
            <DialogContent className="min-w-[40vw] space-y-4">
              <UploadPage />
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={backToLogin}>
            Back to Login
          </Button>
        </div>
      </div>

      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center text-gray-600">
          <p className="text-2xl">👋 No interviews yet!</p>
          <p className="text-sm">Upload a resume to start your first interview session.</p>
        </div>
      ) : (
        interviews.map(group => (
          <div key={group._id} className="mb-10" style={{cursor: "pointer"}} >
            <h2 className="text-xl font-semibold mb-2">{group.resumeName}</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Started</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Questions Answered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {group.sessions.map(session => (
                  <TableRow key={session.sessionId} onClick={e=>InterviewDetails(session.sessionId)}>
                    <TableCell>{new Date(session.startedAt).toLocaleString()}</TableCell>
                    <TableCell>{session.score}</TableCell>
                    <TableCell>{session.questions.length}</TableCell>
                    <TableCell onClick={(e) => deleteOperation(e, session.sessionId) }>
                      <Trash2
                        className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
