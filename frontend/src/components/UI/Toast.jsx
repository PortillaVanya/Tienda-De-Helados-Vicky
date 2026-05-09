import { useEffect } from 'react';
import { clsx } from 'clsx';
import { X } from 'lucide-react';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const types = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  };

  return (
    <div className={clsx(
      'fixed top-4 right-4 z-50 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg text-white animate-slide-in',
      types[type]
    )}>
      <span>{message}</span>
      <button onClick={onClose} className="hover:opacity-75">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
