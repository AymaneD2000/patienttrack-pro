
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Dumbbell, 
  Plus, 
  Search, 
  Clock, 
  Award, 
  User, 
  Tag,
  Trash2,
  Heart
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Sample mock data for exercises
const mockExercises = [
  {
    id: 1,
    name: "Modified Push-ups",
    category: "Upper Body",
    difficulty: "Beginner",
    duration: "10 mins",
    description: "Modified push-ups for patients with limited upper body strength. Perfect for rebuilding strength after injury.",
    targetAreas: ["Shoulders", "Chest", "Arms"],
    imageUrl: "https://placehold.co/200x150"
  },
  {
    id: 2,
    name: "Assisted Squats",
    category: "Lower Body",
    difficulty: "Beginner",
    duration: "12 mins",
    description: "Assisted squats for improving lower body strength and stability. Can be performed with support.",
    targetAreas: ["Quads", "Hamstrings", "Glutes"],
    imageUrl: "https://placehold.co/200x150"
  },
  {
    id: 3,
    name: "Neck Rotations",
    category: "Neck",
    difficulty: "Easy",
    duration: "5 mins",
    description: "Gentle neck rotations to improve mobility and reduce stiffness in the cervical spine.",
    targetAreas: ["Neck", "Cervical Spine"],
    imageUrl: "https://placehold.co/200x150"
  },
  {
    id: 4,
    name: "Hamstring Stretches",
    category: "Flexibility",
    difficulty: "Intermediate",
    duration: "8 mins",
    description: "Effective hamstring stretches to improve flexibility and reduce tension in the back of the legs.",
    targetAreas: ["Hamstrings", "Lower Back"],
    imageUrl: "https://placehold.co/200x150"
  }
];

export default function Exercises() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exercises, setExercises] = useState(mockExercises);
  const { toast } = useToast();

  // Filter exercises based on search term
  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.difficulty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.targetAreas.some(area => area.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteExercise = (id: number) => {
    setExercises(exercises.filter(exercise => exercise.id !== id));
    toast({
      title: "Exercise deleted",
      description: "The exercise has been removed from the library",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'beginner':
        return 'bg-blue-100 text-blue-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-orange-100 text-orange-800';
      case 'expert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="pt-16 lg:pl-64 transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold">Exercise Library</h1>
              <p className="text-gray-500 mt-1">Browse and manage rehabilitation exercises</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link to="/exercises/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Exercise
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search exercises..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredExercises.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExercises.map((exercise) => (
                <Card key={exercise.id} className="overflow-hidden">
                  <div className="aspect-video relative bg-gray-100">
                    <img 
                      src={exercise.imageUrl} 
                      alt={exercise.name}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <CardDescription>{exercise.category}</CardDescription>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteExercise(exercise.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <p className="text-sm text-gray-600 mb-3">{exercise.description}</p>
                    <div className="flex items-center text-sm mb-2">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{exercise.duration}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {exercise.targetAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-50">
                          <Tag className="h-3 w-3 mr-1" />
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 border-t">
                    <Button variant="ghost" size="sm" className="w-full">
                      <Heart className="h-4 w-4 mr-2" />
                      Add to Favorites
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border shadow-sm p-8 text-center">
              <div className="h-20 w-20 rounded-full bg-gray-100 mx-auto flex items-center justify-center mb-4">
                <Dumbbell className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No exercises found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm ? "No exercises match your search criteria." : "Start by adding exercises to your rehabilitation library."}
              </p>
              <Link to="/exercises/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Exercise
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
