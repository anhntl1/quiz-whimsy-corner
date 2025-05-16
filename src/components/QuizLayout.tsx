
import { ReactNode } from "react";

interface QuizLayoutProps {
  children: ReactNode;
}

const QuizLayout = ({ children }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex flex-col">
      <header className="bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-purple-700">Quiz Whimsy Corner</h1>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="bg-white py-4 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Quiz Whimsy Corner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default QuizLayout;
