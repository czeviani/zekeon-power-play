
import React from 'react';

type NextButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  isSubmitting?: boolean;
  text?: string;
};

const NextButton: React.FC<NextButtonProps> = ({ 
  onClick, 
  disabled = false, 
  isSubmitting = false,
  text = 'Continuar' 
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-6 bg-black/90 backdrop-blur-md border-t border-gray-800/50">
      <div className="max-w-md mx-auto">
        <button
          onClick={onClick}
          disabled={disabled || isSubmitting}
          className="w-full p-4 rounded-xl bg-[#42e076] text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg tracking-wide transition-all duration-300 hover:bg-[#42e076]/90 disabled:hover:bg-[#42e076] flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent" />
              <span>Enviando...</span>
            </>
          ) : (
            text
          )}
        </button>
      </div>
    </div>
  );
};

export default NextButton;
