
import { QuizResult as QuizResultType } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Home, RefreshCcw, PartyPopper } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizResultProps {
  result: QuizResultType;
  onRestartQuiz: () => void;
}

const QuizResult = ({ result, onRestartQuiz }: QuizResultProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
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
        <Button onClick={onRestartQuiz} variant="outline" className="flex items-center gap-2">
          <RefreshCcw size={16} />
          Retake Quiz
        </Button>
        <Button onClick={() => navigate("/")} className="flex items-center gap-2">
          <Home size={16} />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;
