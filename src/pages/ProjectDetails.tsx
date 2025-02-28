
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 p-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
        </div>
        
        <div className="bg-white rounded-lg border p-6 mb-6">
          <h1 className="text-2xl font-bold">Project Details</h1>
          <p className="text-gray-600 mt-2">Project ID: {projectId}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
