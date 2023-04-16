import React from "react";
import Toast from "components/atoms/Toast";
import { createPortal } from "react-dom";
import { NotificationContainerProps } from "./NotificationContainer.props";
import { AnimatePresence, motion } from "framer-motion";
import { notificationContainerAnimationVariants } from "./NotificationContainer.animation";

const NotificationContainer: React.FC<NotificationContainerProps> = ({ toasts }) =>
	createPortal(
		<div className="overflow-y-hiddendd absolute right-0 top-0 z-40 m-4">
			<AnimatePresence>
				{toasts.map((toast) => (
					<motion.div
						key={toast.id}
						variants={notificationContainerAnimationVariants}
						initial="hidden"
						animate="show"
						exit="exit"
					>
						<Toast id={toast.id} type={toast.type} message={toast.message} />
					</motion.div>
				))}
			</AnimatePresence>
		</div>,
		document.querySelector("#toast-root") as HTMLDivElement
	);

export default NotificationContainer;
