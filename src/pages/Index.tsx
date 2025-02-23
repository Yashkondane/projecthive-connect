
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Project } from "@/types";
import { useState } from "react";

// Sample data
const sampleProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of company website",
    progress: 75,
    status: "active",
    priority: "high",
    dueDate: "2024-03-15",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "New mobile application for clients",
    progress: 30,
    status: "active",
    priority: "medium",
    dueDate: "2024-04-01",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 marketing initiative",
    progress: 90,
    status: "active",
    priority: "high",
    dueDate: "2024-02-28",
  },
];

const Index = () => {
  const [projects] = useState<Project[]>(sampleProjects);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">
              Welcome back! Here's an overview of your projects.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <div key={project.id} className="card fade-in">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      project.priority === "high" 
                        ? "bg-red-100 text-red-800" 
                        : project.priority === "medium" 
                        ? "bg-yellow-100 text-yellow-800" 
                        : "bg-green-100 text-green-800"
                    }`}>
                      {project.priority}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all duration-300 ease-in-out"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Due {new Date(project.dueDate).toLocaleDateString()}</span>
                  <button className="rounded-md px-3 py-1 text-primary hover:bg-primary/10">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
