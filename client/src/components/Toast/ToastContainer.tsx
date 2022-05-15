import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { useToast } from "../../context/ToastContext";
import { toastVariants } from "../app.animations";

interface IToast {
	id: number;
	content: string;
	type: string;
}

const ToastContainer: React.FC<{ toasts: IToast[] }> = ({ toasts }) =>
	createPortal(
		<div className="absolute m-4 right-0 top-0 z-40 overflow-y-hiddendd">
			<AnimatePresence>
				{toasts.map((toast: IToast) => (
					<motion.div
						key={toast.id}
						variants={toastVariants}
						initial="hidden"
						animate="show"
						exit="exit"
					>
						<Toast id={toast.id} type={toast.type} message={toast.content} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>,
		document.getElementById("toast-root") as HTMLDivElement
	);

interface IToastProps {
	type: string;
	message: string;
	id: number;
}

const Toast: React.FC<IToastProps> = ({ type, message, id }) => {
	const [toastType, setToastType] = useState({
		headline: "Success",
		style: "w-42 bg-green-200 border-green-400 text-green-600 border-l-4 p-4"
	});
	const { removeToast } = useToast();

	useEffect(() => {
		switch (type) {
			case "danger":
				setToastType({
					headline: "Danger",
					style:
						"w-full relative bg-yellow-200 border-yellow-600 text-yellow-600 border-l-4 p-2"
				});
				break;
			case "success":
				setToastType({
					headline: "Success",
					style:
						"w-full relative bg-green-200 border-green-600 text-green-600 border-l-4 p-2"
				});
				break;
			case "error":
				setToastType({
					headline: "Error",
					style:
						"w-full relative bg-red-200 border-red-600 text-red-600 border-l-4 p-2"
				});
				break;
			default:
				break;
		}
		const timer = setTimeout(() => {
			removeToast(id);
		}, 5000);

		return () => clearTimeout(timer);
	}, [id, removeToast, type]);

	return (
		<div className="w-80 mb-4 font-sans break-words">
			<div className={toastType.style}>
				<AiOutlineClose
					onClick={() => removeToast(id)}
					className="absolute top-0 right-0 m-2 cursor-pointer"
				/>
				<p className="text-xl font-bold pb-3">{toastType.headline}</p>
				<p className="text-md">{message}</p>
			</div>
		</div>
	);
};

export default ToastContainer;
