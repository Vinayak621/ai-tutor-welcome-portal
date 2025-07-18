import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface UploadPageProps {
  onUploadComplete?: (file: File) => void;
}

const UploadPage = ({ onUploadComplete }: UploadPageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      handleFile(file);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or document file.",
        variant: "destructive"
      });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploadedFile(file);
      setUploading(false);
      toast({
        title: "Resume uploaded successfully!",
        description: "Ready to start your interview process.",
      });
      onUploadComplete?.(file);
    }, 2000);
  };

  const proceedToInterview = () => {
    if (uploadedFile) {
      navigate('/interview');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Upload Your Resume
        </h2>
        <p className="text-muted-foreground">
          Upload your resume to get started with AI-powered interview practice
        </p>
      </div>

      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-300 ${
              dragActive 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            } ${uploading ? 'animate-pulse' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              disabled={uploading || !!uploadedFile}
            />
            
            <div className="text-center space-y-4">
              {uploading ? (
                <>
                  <Upload className="h-12 w-12 mx-auto text-primary animate-spin" />
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Uploading your resume...</p>
                    <p className="text-sm text-muted-foreground">Please wait while we process your file</p>
                  </div>
                </>
              ) : uploadedFile ? (
                <>
                  <CheckCircle className="h-12 w-12 mx-auto text-tech-green" />
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">Resume uploaded successfully!</p>
                    <p className="text-sm text-muted-foreground">{uploadedFile.name}</p>
                  </div>
                </>
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-foreground font-medium">
                      Drag and drop your resume here
                    </p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse files
                    </p>
                  </div>
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Supports PDF, DOC, DOCX</span>
                  </div>
                </>
              )}
            </div>
          </div>
          
          {uploadedFile && (
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={proceedToInterview}
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
                size="lg"
              >
                Start Interview Process
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="text-center">
        <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
          <AlertCircle className="h-4 w-4" />
          <span>Your resume will be analyzed by our AI for personalized interview questions</span>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;