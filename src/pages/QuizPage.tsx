import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "@/data/quizzes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz, QuizResult } from "@/types/quiz";
import { Cake, Smile, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QuizQuestions from "@/components/QuizQuestions";
import QuizResultComponent from "@/components/QuizResult";

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (id) {
      const foundQuiz = getQuizById(id);
      if (foundQuiz) {
        setQuiz(foundQuiz);
        // Initialize with empty selections if not already set
        if (selectedAnswers.length === 0) {
          setSelectedAnswers(new Array(foundQuiz.questions.length).fill(""));
        }
      } else {
        toast({
          title: "Quiz not found",
          description: "We couldn't find the quiz you're looking for.",
          variant: "destructive",
        });
        navigate("/");
      }
    }
  }, [id, navigate, selectedAnswers.length]);

  const handleAnswerSelect = (questionIndex: number, optionId: string, points: number) => {
    const newSelectedAnswers = [...selectedAnswers];
    
    // If user is changing their answer, subtract the previous points
    const previousOptionId = newSelectedAnswers[questionIndex];
    if (previousOptionId) {
      const previousOption = quiz?.questions[questionIndex].options.find(o => o.id === previousOptionId);
      if (previousOption) {
        setTotalScore(prevScore => prevScore - previousOption.points);
      }
    }
    
    newSelectedAnswers[questionIndex] = optionId;
    setSelectedAnswers(newSelectedAnswers);
    setTotalScore(prevScore => prevScore + points);
    
    // Calculate progress
    const answeredQuestions = newSelectedAnswers.filter(answer => answer !== "").length;
    setProgress((answeredQuestions / (quiz?.questions.length || 1)) * 100);
  };

  const handleSubmit = () => {
    if (!quiz) return;
    
    // Check if all questions are answered
    const unansweredQuestions = selectedAnswers.findIndex(answer => answer === "");
    if (unansweredQuestions !== -1) {
      toast({
        title: "Incomplete quiz",
        description: `Please answer question ${unansweredQuestions + 1} before submitting.`,
        variant: "destructive",
      });
      return;
    }
    
    calculateResult();
    setShowResult(true);
  };

  const calculateResult = () => {
    if (!quiz) return;
    
    const matchedResult = quiz.results.find(
      (r) => totalScore >= r.minScore && totalScore <= r.maxScore
    );
    
    if (matchedResult) {
      setResult(matchedResult);
    }
  };

  const restartQuiz = () => {
    // Keep the selected answers but reset the visible result
    setShowResult(false);
    setResult(null);
  };

  if (!quiz) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Loading quiz...</h2>
          <Cake className="mx-auto animate-bounce text-pink-400" size={48} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-gray-200 shadow-sm mb-8">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Star className="text-yellow-400" />
              {quiz.title}
              <Star className="text-yellow-400" />
            </CardTitle>
            {!showResult && (
              <CardDescription>
                {progress === 100 ? (
                  <span className="flex items-center justify-center gap-1">
                    All questions answered! <Smile className="text-green-500" size={18} />
                  </span>
                ) : (
                  `Answer all questions to see your result`
                )}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent>
            {!showResult ? (
              <QuizQuestions 
                questions={quiz.questions}
                selectedAnswers={selectedAnswers}
                progress={progress}
                onAnswerSelect={handleAnswerSelect}
                onSubmit={handleSubmit}
              />
            ) : result ? (
              <QuizResultComponent 
                result={result} 
                onRestartQuiz={restartQuiz} 
              />
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
