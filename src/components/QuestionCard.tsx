
import { QuizOption, QuizQuestion } from "@/types/quiz";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Cookie } from "lucide-react";

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  selectedAnswer: string;
  onAnswerSelect: (questionIndex: number, optionId: string, points: number) => void;
}

const QuestionCard = ({
  question,
  questionIndex,
  selectedAnswer,
  onAnswerSelect,
}: QuestionCardProps) => {
  return (
    <div className="border border-gray-100 rounded-lg p-5 bg-white shadow-sm">
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
        value={selectedAnswer}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <div 
            key={option.id} 
            className={`flex items-center space-x-2 border rounded-lg p-3 transition-all cursor-pointer ${
              selectedAnswer === option.id 
                ? "border-purple-300 bg-purple-50" 
                : "border-gray-200 hover:bg-blue-50"
            }`}
            onClick={() => onAnswerSelect(questionIndex, option.id, option.points)}
          >
            <RadioGroupItem 
              value={option.id} 
              id={`option-${questionIndex}-${option.id}`}
              checked={selectedAnswer === option.id}
            />
            <label 
              htmlFor={`option-${questionIndex}-${option.id}`}
              className="w-full cursor-pointer py-1"
            >
              <div className="flex flex-col">
                <span>{option.text}</span>
                {option.image && (
                  <img 
                    src={option.image} 
                    alt={option.text} 
                    className="mt-2 max-h-40 object-contain rounded" 
                  />
                )}
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default QuestionCard;
