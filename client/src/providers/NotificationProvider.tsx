import React, { useState, useCallback } from "react";
import { v4 as uuid } from "uuid";
import NotificationContainer from "components/molecules/NotificationContainer";
import type { ToastProps } from "components/atoms/Toast";

type NotificationContextType = {
	pushNotification: (message: ToastProps["message"], type: ToastProps["type"]) => void;
	removeNotification: (id: ToastProps["id"]) => void;
};

const NotificationContext = React.createContext<NotificationContextType>({
	pushNotification: (message, type) =>
		console.log(`Addming toast with message: ${message} and type ${type}`),
	removeNotification: (idToRemove) => console.log(`Removing toast id: ${idToRemove}`)
});

const NotificationProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastProps[]>([]);

	const pushNotification = useCallback(
		(message: ToastProps["message"], type: ToastProps["type"]) => {
			setToasts((previousState) => [
				...previousState,
				{
					id: uuid(),
					message,
					type
				}
			]);
		},
		[setToasts]
	);

	const removeNotification = useCallback(
		(idToRemove: ToastProps["id"]) => {
			setToasts((previousState) => previousState.filter((toast) => toast.id !== idToRemove));
		},
		[setToasts]
	);

	return (
		<NotificationContext.Provider value={{ pushNotification, removeNotification }}>
			<NotificationContainer toasts={toasts} />
			{children}
		</NotificationContext.Provider>
	);
};

export { NotificationContext };
export default NotificationProvider;
