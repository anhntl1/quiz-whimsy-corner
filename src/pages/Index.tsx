
import { useNavigate } from "react-router-dom";
import { quizzes } from "@/data/quizzes";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Heart, Cake, Cookie, Balloon } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-2">
            <Cake className="text-pink-400" size={32} />
            Quiz Whimsy Corner
            <Cake className="text-pink-400" size={32} />
          </h1>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
            <Heart className="text-red-400" size={18} />
            Choose a fun quiz and discover something new about yourself!
            <Heart className="text-red-400" size={18} />
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="overflow-hidden border border-gray-200 hover:shadow-md transition-shadow flex flex-col">
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <img
                  src={quiz.image}
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <Star className="text-yellow-400 drop-shadow-md" size={24} />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cookie className="text-amber-500" size={20} />
                  {quiz.title}
                </CardTitle>
                <CardDescription>{quiz.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Balloon className="text-purple-400" size={16} />
                    {quiz.questions.length} fun questions
                  </span>
                </div>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button 
                  onClick={() => navigate(`/quiz/${quiz.id}`)} 
                  className="w-full group"
                >
                  Take Quiz
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
