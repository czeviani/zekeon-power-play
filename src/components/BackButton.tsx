
import React from 'react';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  onClick: () => void;
};

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed top-6 left-6 z-10 text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm group bg-black/90 backdrop-blur-sm py-2 px-4 rounded-lg"
    >
      <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
      <span className="font-light tracking-wide">Voltar</span>
    </button>
  );
};

export default BackButton;
