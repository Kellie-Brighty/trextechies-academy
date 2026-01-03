import { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Expose a global way to add notifications (for mock demonstration)
  useEffect(() => {
    (window as any).addNotification = (type: 'success' | 'error' | 'info', message: string) => {
      const id = Math.random().toString(36).substr(2, 9);
      setNotifications(prev => [...prev, { id, type, message }]);
      
      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    };
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 max-w-sm w-full">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 rounded-xl shadow-lg border-2 flex items-start gap-3 animate-in slide-in-from-right-full duration-300 ${
            n.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
            n.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
            'bg-blue-50 border-blue-200 text-blue-800'
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {n.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500" />}
            {n.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
          </div>
          <p className="text-sm font-medium flex-1">{n.message}</p>
          <button
            onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
            className="shrink-0 p-1 hover:bg-black/5 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
