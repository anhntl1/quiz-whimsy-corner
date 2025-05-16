
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import QuizProgress from "@/components/QuizProgress";
import QuestionCard from "@/components/QuestionCard";

interface QuizQuestionsProps {
  questions: QuizQuestionType[];
  selectedAnswers: string[];
  progress: number;
  onAnswerSelect: (questionIndex: number, optionId: string, points: number) => void;
  onSubmit: () => void;
}

const QuizQuestions = ({
  questions,
  selectedAnswers,
  progress,
  onAnswerSelect,
  onSubmit,
}: QuizQuestionsProps) => {
  return (
    <div>
      <QuizProgress 
        currentStep={Math.max(0, Math.ceil(progress / 100 * questions.length))} 
        totalSteps={questions.length} 
      />
      
      <div className="space-y-8">
        {questions.map((question, questionIndex) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={questionIndex}
            selectedAnswer={selectedAnswers[questionIndex]}
            onAnswerSelect={onAnswerSelect}
          />
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
        <Button 
          onClick={onSubmit} 
          className="px-8 py-2 text-lg flex items-center gap-2"
          disabled={selectedAnswers.some(a => a === "")}
        >
          Submit Quiz
          <Heart className={progress === 100 ? "text-red-400 animate-pulse" : ""} />
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestions;
