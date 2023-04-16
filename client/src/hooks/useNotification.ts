import { useContext } from "react";
import { NotificationContext } from "src/providers/NotificationProvider";

export const useNotification = () => {
	const toastHelpers = useContext(NotificationContext);

	return toastHelpers;
};
