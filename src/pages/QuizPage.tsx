
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "@/data/quizzes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz, QuizResult } from "@/types/quiz";
import { ArrowRight, Home, RefreshCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (id) {
      const foundQuiz = getQuizById(id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
      } else {
        toast({
          title: "Quiz not found",
          description: "We couldn't find the quiz you're looking for.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleAnswerSelect = (optionId: string, points: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestionIndex] = optionId;
    setSelectedAnswers(newSelectedAnswers);

    const newScore = totalScore + points;
    setTotalScore(newScore);
    
    // Go to next question or show result
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult(newScore);
      setShowResult(true);
    }
  };

  const calculateResult = (score: number) => {
    if (!quiz) return;
    
    const matchedResult = quiz.results.find(
      (r) => score >= r.minScore && score <= r.maxScore
    );
    
    if (matchedResult) {
      setResult(matchedResult);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setTotalScore(0);
    setShowResult(false);
    setResult(null);
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading quiz...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle>{quiz.title}</CardTitle>
            {!showResult && (
              <CardDescription>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent>
            {!showResult ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-4">
                    {quiz.questions[currentQuestionIndex].text}
                  </h3>
                  
                  {quiz.questions[currentQuestionIndex].image && (
                    <div className="mb-4">
                      <img
                        src={quiz.questions[currentQuestionIndex].image}
                        alt="Question"
                        className="mx-auto max-h-60 object-contain rounded"
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {quiz.questions[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-4 px-6 hover:bg-blue-50"
                      onClick={() => handleAnswerSelect(option.id, option.points)}
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                {result && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">{result.title}</h3>
                    
                    {result.image && (
                      <div className="mb-6">
                        <img
                          src={result.image}
                          alt={result.title}
                          className="mx-auto max-h-60 object-contain rounded"
                        />
                      </div>
                    )}
                    
                    <p className="mb-6 text-gray-700">{result.description}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button onClick={restartQuiz} variant="outline" className="flex items-center gap-2">
                        <RefreshCcw size={16} />
                        Retake Quiz
                      </Button>
                      <Button onClick={() => navigate("/")} className="flex items-center gap-2">
                        <Home size={16} />
                        Back to Home
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
