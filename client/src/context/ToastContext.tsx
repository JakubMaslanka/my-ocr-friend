import React, { useState, useContext, useCallback } from "react";
import ToastContainer from "../components/Toast";

interface IToastProvider {
	children: React.ReactNode;
}

interface IToast {
	id: number;
	content: string;
	type: string;
}

type ToastContextType = {
	addToast: (content: string, type: string) => void;
	removeToast: (id: number) => void;
};

let id = 1;

const ToastContext = React.createContext<ToastContextType>({
	addToast: (message, type) =>
		console.log(`Addming toast with message: ${message} and type ${type}`),
	removeToast: (idToRemove) => console.log(`Removing toast id: ${idToRemove}`)
});

const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
	const [toasts, setToasts] = useState<IToast[]>([]);

	const addToast = useCallback(
		(content: string, type: string) => {
			setToasts((previousState) => [
				...previousState,
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
		(idToRemove: number) => {
			setToasts((previousState) => previousState.filter((toast) => toast.id !== idToRemove));
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
