import { useContext } from "react";
import { NotificationContext } from "~/providers/NotificationProvider";

export const useNotification = () => {
	const toastHelpers = useContext(NotificationContext);

	return toastHelpers;
};
