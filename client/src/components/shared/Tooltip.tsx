import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { tooltipVaritans } from "../app.animations";

export const Tooltip: React.FC<{
	tooltipText: string;
	children: JSX.Element;
}> = ({ tooltipText, children, ...rest }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	return (
		<div
			className="relative cursor-default"
			onMouseEnter={() => setShowTooltip(true)}
			onMouseLeave={() => setShowTooltip(false)}
			{...rest}
		>
			<AnimatePresence>
				{showTooltip && (
					<motion.div
						variants={tooltipVaritans}
						initial="hidden"
						animate="show"
						exit="exit"
						className="absolute w-24 text-sm text-center bg-gray-600 dark:bg-gray-200 text-gray-200 dark:text-gray-900 -top-14 -left-8 p-1 border overflow-hidden border-gray-300 rounded-lg shadow-md"
					>
						{tooltipText}
					</motion.div>
				)}
			</AnimatePresence>
			{children}
		</div>
	);
};
