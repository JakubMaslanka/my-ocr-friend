import React from "react";
import { motion } from "framer-motion";

const spinningTransition = {
	loop: Number.POSITIVE_INFINITY,
	duration: 1.25,
	ease: "linear"
};

export const LoadingSpinner = () => (
	<div className="relative flex h-screen w-screen items-center justify-center">
		<motion.span
			animate={{ rotate: 360 }}
			exit={{ background: "#c026d3d9", border: "none", scale: 1000 }}
			transition={spinningTransition}
			className="block h-12 w-12 rounded-full border-4 border-gray-200 border-t-fuchsia-600 "
		/>
	</div>
);
