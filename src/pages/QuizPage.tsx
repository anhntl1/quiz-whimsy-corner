import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById } from "@/data/quizzes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz, QuizResult } from "@/types/quiz";
import { Home, RefreshCcw, Heart, Star, Cake, Cookie, PartyPopper, Smile } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuizProgress from "@/components/QuizProgress";

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
        setSelectedAnswers(new Array(foundQuiz.questions.length).fill(""));
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
    setSelectedAnswers(new Array(quiz?.questions.length || 0).fill(""));
    setTotalScore(0);
    setShowResult(false);
    setResult(null);
    setProgress(0);
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
              <div>
                <QuizProgress currentStep={Math.max(1, Math.ceil(progress / 100 * quiz.questions.length))} totalSteps={quiz.questions.length} />
                
                <div className="space-y-8">
                  {quiz.questions.map((question, questionIndex) => (
                    <div key={question.id} className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
                      <h3 className="text-xl font-medium mb-4 flex items-center gap-2">
                        <Cookie className="text-amber-500" size={20} />
                        Question {questionIndex + 1}: {question.text}
                      </h3>
                      
                      {question.image && (
                        <div className="mb-4">
                          <img
                            src={question.image}
                            alt="Question"
                            className="mx-auto max-h-60 object-contain rounded"
                          />
                        </div>
                      )}
                      
                      <RadioGroup 
                        value={selectedAnswers[questionIndex]}
                        className="space-y-3"
                      >
                        {question.options.map((option) => (
                          <div 
                            key={option.id} 
                            className={`flex items-center space-x-2 border rounded-lg p-3 transition-all cursor-pointer ${
                              selectedAnswers[questionIndex] === option.id 
                                ? "border-purple-300 bg-purple-50" 
                                : "border-gray-200 hover:bg-blue-50"
                            }`}
                            onClick={() => handleAnswerSelect(questionIndex, option.id, option.points)}
                          >
                            <RadioGroupItem 
                              value={option.id} 
                              id={`option-${questionIndex}-${option.id}`}
                              checked={selectedAnswers[questionIndex] === option.id}
                            />
                            <label 
                              htmlFor={`option-${questionIndex}-${option.id}`}
                              className="w-full cursor-pointer py-1"
                            >
                              {option.text}
                              {option.image && (
                                <img 
                                  src={option.image} 
                                  alt={option.text} 
                                  className="mt-2 max-h-32 object-contain"
                                />
                              )}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Button 
                    onClick={handleSubmit} 
                    className="px-8 py-2 text-lg flex items-center gap-2"
                    disabled={selectedAnswers.some(a => a === "")}
                  >
                    Submit Quiz
                    <Heart className={progress === 100 ? "text-red-400 animate-pulse" : ""} />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center">
                {result && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                      <PartyPopper className="text-pink-400" />
                      {result.title}
                      <PartyPopper className="text-pink-400" />
                    </h3>
                    
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
