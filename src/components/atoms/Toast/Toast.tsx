import React, { useEffect, useState } from "react";
import { ToastProps } from "./Toast.props";
import { useNotification } from "~/hooks/useNotification";
import { AiOutlineClose } from "react-icons/ai";

const Toast: React.FC<ToastProps> = ({ type, message, id }) => {
	const [toastType, setToastType] = useState({
		headline: "Success",
		style: "w-42 bg-green-200 border-green-400 text-green-600 border-l-4 p-4"
	});
	const { removeNotification } = useNotification();

	useEffect(() => {
		switch (type) {
			case "danger":
				setToastType({
					headline: "Danger",
					style: "w-full relative bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-2"
				});
				break;
			case "success":
				setToastType({
					headline: "Success",
					style: "w-full relative bg-green-200 border-green-600 text-green-600 border-l-4 p-2"
				});
				break;
			case "error":
				setToastType({
					headline: "Error",
					style: "w-full relative bg-red-200 border-red-600 text-red-600 border-l-4 p-2"
				});
				break;
			default:
				break;
		}
		const timer = setTimeout(() => {
			removeNotification(id as number);
		}, 5000);

		return () => clearTimeout(timer);
	}, [id, removeNotification, type]);

	return (
		<div className="mb-4 w-80 break-words font-sans">
			<div className={toastType.style}>
				<AiOutlineClose
					onClick={() => removeNotification(id as number)}
					className="absolute top-0 right-0 m-2 cursor-pointer"
				/>
				<p className="pb-3 text-xl font-bold">{toastType.headline}</p>
				<p className="text-md">{message}</p>
			</div>
		</div>
	);
};

export default Toast;
