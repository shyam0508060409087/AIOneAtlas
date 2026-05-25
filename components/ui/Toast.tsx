"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ToastItem {
  id: string;
  icon: string;
  message: string;
}

interface ToastContextValue {
  toast: (icon: string, message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((icon: string, message: string, duration = 2800) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, icon, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast container */}
      <div
        className="fixed bottom-6 right-6 z-[500] flex flex-col gap-2"
        aria-live="polite"
      >
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              className="toast"
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setToasts((prev) => prev.filter((i) => i.id !== t.id))}
            >
              <span className="text-base flex-shrink-0">{t.icon}</span>
              <span className="text-sm font-medium text-text-1">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}

// Standalone toast component (for use without context)
export function ToastStandalone({ icon, message }: { icon: string; message: string }) {
  return (
    <motion.div
      className="toast"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 12 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-base">{icon}</span>
      <span className="text-sm font-medium text-text-1">{message}</span>
    </motion.div>
  );
}
