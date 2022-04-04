import React, { useState, useContext, useCallback } from "react";
import ToastContainer from "../Toast";

interface IToastProvider {
    children: React.ReactNode
}

interface IToast {
    id: number, 
    content: string, 
    type: string
}

type ToastContextType = {
    addToast: (content: string, type: string) => void,
    removeToast: (id: number) => void
};

let id = 1;

const ToastContext = React.createContext<ToastContextType>({
    addToast: (c, t) => console.log(`Addming toast with message: ${c} and type ${t}`),
    removeToast: (id) => console.log(`Removing toast id: ${id}`)
});

const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const addToast = useCallback(
    (content: string, type: string) => {
      setToasts((toasts) => [
        ...toasts,
        {
          id: id++,
          content,
          type
        }
      ]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id: number) => {
      setToasts(toasts => toasts.filter(t => t.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
        <ToastContainer toasts={toasts} />
        {children}
    </ToastContext.Provider>
  );
};

const useToast = () => {
  const toastHelpers = useContext(ToastContext);

  return toastHelpers;
};

export { ToastContext, useToast };
export default ToastProvider;
