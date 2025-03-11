
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

export default function Records() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Medical Records</h1>
              <p className="text-gray-500 mt-1">Manage patient medical records</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/records/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Record
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
            <div className="h-20 w-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
              <FileText className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium mb-2">No medical records</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start by adding your first medical record.
            </p>
            <Link to="/records/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Record
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
