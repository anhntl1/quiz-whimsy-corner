
import { Heart, Star } from 'lucide-react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

const QuizProgress = ({ currentStep, totalSteps }: QuizProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span className="flex items-center gap-1">
          <Heart className="text-pink-400" size={16} />
          {currentStep === totalSteps ? 'All questions answered!' : `${currentStep} of ${totalSteps} questions answered`}
        </span>
        <span className="flex items-center gap-1">
          {Math.round(progress)}%
          <Star className="text-yellow-400" size={16} />
        </span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 relative"
          style={{ width: `${progress}%` }}
        >
          {progress > 95 && (
            <div className="absolute inset-0 flex items-center justify-center animate-pulse">
              <Star className="text-white" size={12} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
