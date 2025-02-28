
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Project, Task } from "@/types";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Edit,
  Plus,
  Save,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";

// Sample projects (same as in Index.tsx)
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

// Sample tasks
const sampleTasks: Task[] = [
  {
    id: "1",
    projectId: "1",
    title: "Design homepage mockups",
    description: "Create initial designs for the new homepage",
    status: "completed",
    priority: "medium",
    dueDate: "2024-03-01",
  },
  {
    id: "2",
    projectId: "1",
    title: "Implement responsive design",
    description: "Make sure the website works on all devices",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-10",
  },
  {
    id: "3",
    projectId: "1",
    title: "Content migration",
    description: "Move content from old site to new one",
    status: "todo",
    priority: "medium",
    dueDate: "2024-03-12",
  },
  {
    id: "4",
    projectId: "2",
    title: "UI/UX Design",
    description: "Design user interface for mobile app",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-20",
  },
];

// Sample team members
const sampleTeamMembers = [
  { id: "1", name: "John Doe", role: "Project Manager", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: "2", name: "Jane Smith", role: "Developer", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: "3", name: "Mike Johnson", role: "Designer", avatar: "https://i.pravatar.cc/150?img=3" },
];

const ProjectDetails = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState<Project | null>(null);
  const [newTask, setNewTask] = useState("");
  
  useEffect(() => {
    // Find project by ID (simulated data fetch)
    const foundProject = sampleProjects.find(p => p.id === projectId);
    if (foundProject) {
      setProject(foundProject);
      setEditedProject(foundProject);
      
      // Get tasks for this project (simulated data fetch)
      const projectTasks = sampleTasks.filter(task => task.projectId === projectId);
      setTasks(projectTasks);
    } else {
      toast.error("Project not found");
      navigate("/");
    }
  }, [projectId, navigate]);
  
  const handleSaveChanges = () => {
    if (!editedProject) return;
    
    setProject(editedProject);
    setIsEditing(false);
    toast.success("Project updated successfully");
  };
  
  const handleAddTask = () => {
    if (!newTask.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }
    
    const task: Task = {
      id: Date.now().toString(),
      projectId: projectId || "",
      title: newTask,
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: new Date().toISOString(),
    };
    
    setTasks([...tasks, task]);
    setNewTask("");
    toast.success("Task added successfully");
  };
  
  const handleTaskStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status } : task
    ));
  };
  
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success("Task deleted");
  };
  
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-blue-500";
  };
  
  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>;
      case "completed":
        return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Completed</span>;
      case "on-hold":
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">On Hold</span>;
      default:
        return null;
    }
  };
  
  const getTaskStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "todo":
        return <XCircle className="h-4 w-4 text-gray-400" />;
      default:
        return null;
    }
  };
  
  if (!project) {
    return (
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-center h-full">
            <p>Loading project details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Button>
          
          {isEditing ? (
            <div className="flex gap-2">
              <Button onClick={handleSaveChanges}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Project
            </Button>
          )}
        </div>
        
        <div className="bg-white rounded-lg border p-6 mb-6">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <Input 
                  value={editedProject?.name || ""}
                  onChange={(e) => setEditedProject(prev => prev ? {...prev, name: e.target.value} : null)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input 
                  value={editedProject?.description || ""}
                  onChange={(e) => setEditedProject(prev => prev ? {...prev, description: e.target.value} : null)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    className="w-full border rounded p-2"
                    value={editedProject?.status || "active"}
                    onChange={(e) => setEditedProject(prev => prev ? {...prev, status: e.target.value as Project["status"]} : null)}
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On Hold</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Priority</label>
                  <select 
                    className="w-full border rounded p-2"
                    value={editedProject?.priority || "medium"}
                    onChange={(e) => setEditedProject(prev => prev ? {...prev, priority: e.target.value as Project["priority"]} : null)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Due Date</label>
                  <Input 
                    type="date"
                    value={editedProject?.dueDate ? new Date(editedProject.dueDate).toISOString().split('T')[0] : ""}
                    onChange={(e) => setEditedProject(prev => prev ? {...prev, dueDate: e.target.value} : null)}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Progress ({editedProject?.progress || 0}%)</label>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  className="w-full"
                  value={editedProject?.progress || 0}
                  onChange={(e) => setEditedProject(prev => prev ? {...prev, progress: parseInt(e.target.value)} : null)}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">{project.name}</h1>
                {getStatusBadge(project.status)}
              </div>
              
              <p className="text-gray-600 mt-2">{project.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-500">Priority</p>
                  <p className="font-medium">{project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Due Date</p>
                  <p className="font-medium">{new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div 
                      className={`h-2.5 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-right mt-1">{project.progress}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Management Section */}
          <div className="lg:col-span-2 bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Tasks</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/tasks")}>
                View All Tasks
              </Button>
            </div>
            
            <div className="flex gap-2 mb-4">
              <Input 
                placeholder="Add a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask();
                  }
                }}
              />
              <Button onClick={handleAddTask}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="space-y-3 mt-4">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center">
                      <div className="mr-3">
                        {getTaskStatusIcon(task.status)}
                      </div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        {task.description && (
                          <p className="text-sm text-gray-500">{task.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <select
                        className="text-xs border rounded px-2 py-1 mr-2"
                        value={task.status}
                        onChange={(e) => handleTaskStatusChange(task.id, e.target.value as Task["status"])}
                      >
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2 className="h-4 w-4 text-gray-500" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No tasks found for this project
                </div>
              )}
            </div>
          </div>
          
          {/* Team Section */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Team Members</h2>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Manage Team
              </Button>
            </div>
            
            <div className="space-y-4">
              {sampleTeamMembers.map((member) => (
                <div key={member.id} className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <h3 className="text-sm font-medium mb-2">Upcoming Deadlines</h3>
              <div className="space-y-2">
                {tasks
                  .filter(task => task.status !== "completed")
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 3)
                  .map(task => (
                    <div key={task.id} className="flex items-center text-sm">
                      <Calendar className="h-3 w-3 mr-2 text-gray-500" />
                      <span className="flex-1">{task.title}</span>
                      <span className="text-gray-500">{new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                  ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
