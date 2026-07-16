import React, { useEffect } from 'react';
import { X, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export type NotificationType = 'success' | 'info' | 'warning';

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

export default function Notification({ message, type, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="text-brand-gold w-5 h-5 shrink-0" />,
    info: <Info className="text-blue-400 w-5 h-5 shrink-0" />,
    warning: <AlertTriangle className="text-amber-500 w-5 h-5 shrink-0" />
  };

  const bgStyles = {
    success: 'bg-brand-darker/90 border-brand-gold/30 text-brand-light shadow-[0_0_15px_rgba(212,175,55,0.15)]',
    info: 'bg-brand-darker/90 border-blue-500/30 text-brand-light shadow-[0_0_15px_rgba(59,130,246,0.15)]',
    warning: 'bg-brand-darker/90 border-amber-500/30 text-brand-light shadow-[0_0_15px_rgba(245,158,11,0.15)]'
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-md transition-all duration-300 animate-slide-in ${bgStyles[type]}`}>
      {icons[type]}
      <p className="text-sm font-sans tracking-wide leading-relaxed pr-2">{message}</p>
      <button 
        onClick={onClose} 
        className="text-brand-light/60 hover:text-brand-gold transition-colors duration-200"
        aria-label="Cerrar notificación"
      >
        <X size={16} />
      </button>
    </div>
  );
}
