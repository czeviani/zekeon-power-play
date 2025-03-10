
import React from 'react';

export function Toaster() {
  return <div id="toast-container" className="fixed top-4 right-4 z-50" />;
}

export function Toast({ 
  title, 
  description,
  variant = 'default'
}: { 
  title?: string, 
  description?: string,
  variant?: 'default' | 'destructive' 
}) {
  const bgColor = variant === 'destructive' ? 'bg-red-500' : 'bg-gray-800';
  
  return (
    <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg mb-2 flex flex-col`}>
      {title && <div className="font-semibold">{title}</div>}
      {description && <div className="text-sm opacity-90">{description}</div>}
    </div>
  );
}

export function useToast() {
  const toast = ({ title, description, variant }: { title?: string, description?: string, variant?: 'default' | 'destructive' }) => {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toastElement = document.createElement('div');
    const toastId = Math.random().toString(36).substring(2, 9);
    toastElement.id = `toast-${toastId}`;
    container.appendChild(toastElement);
    
    // Remove the toast after 5 seconds
    setTimeout(() => {
      const el = document.getElementById(`toast-${toastId}`);
      if (el) {
        el.style.opacity = '0';
        el.style.transform = 'translateX(100%)';
        setTimeout(() => el.remove(), 300);
      }
    }, 5000);
  };
  
  return { toast };
}
