import React, { useState } from "react";
import type { TooltipProps } from "./Tooltip.props";
import { AnimatePresence, motion } from "framer-motion";
import { tooltipAnimationVaritans } from "./Tooltip.animation";

const Tooltip: React.FC<TooltipProps> = ({ tooltipText, children, ...rest }) => {
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
						variants={tooltipAnimationVaritans}
						initial="hidden"
						animate="show"
						exit="exit"
						className="absolute -top-14 -left-8 w-24 overflow-hidden rounded-lg border border-gray-300 bg-gray-600 p-1 text-center text-sm text-gray-200 shadow-md dark:bg-gray-200 dark:text-gray-900"
					>
						{tooltipText}
					</motion.div>
				)}
			</AnimatePresence>
			{children}
		</div>
	);
};

export default Tooltip;
