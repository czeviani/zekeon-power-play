
import React from 'react';

export function Toaster() {
  return <div id="sonner-container" className="fixed bottom-4 right-4 z-50" />;
}

export function toast(message: string, options?: { description?: string, type?: 'default' | 'success' | 'error' }) {
  const container = document.getElementById('sonner-container');
  if (!container) return;
  
  const toastElement = document.createElement('div');
  const toastId = Math.random().toString(36).substring(2, 9);
  toastElement.id = `sonner-${toastId}`;
  
  const bgColor = 
    options?.type === 'success' ? 'bg-green-500' : 
    options?.type === 'error' ? 'bg-red-500' : 
    'bg-gray-800';
  
  toastElement.className = `${bgColor} text-white p-4 rounded-lg shadow-lg mb-2 flex flex-col opacity-0 transform translate-y-2 transition-all`;
  toastElement.innerHTML = `
    <div class="font-semibold">${message}</div>
    ${options?.description ? `<div class="text-sm opacity-90">${options.description}</div>` : ''}
  `;
  
  container.appendChild(toastElement);
  
  // Animate in
  setTimeout(() => {
    toastElement.style.opacity = '1';
    toastElement.style.transform = 'translateY(0)';
  }, 10);
  
  // Remove the toast after 5 seconds
  setTimeout(() => {
    const el = document.getElementById(`sonner-${toastId}`);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(10px)';
      setTimeout(() => el.remove(), 300);
    }
  }, 5000);
  
  return toastId;
}
