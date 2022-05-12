import { motion } from "framer-motion";

const spinningTransition = {
	loop: Infinity,
	duration: 1.25,
	ease: "linear"
};

export const LoadingSpinner = () => (
	<div className="relative w-screen h-screen flex justify-center items-center">
		<motion.span
			animate={{ rotate: 360 }}
			exit={{ background: "#c026d3d9", border: "none", scale: 1000 }}
			transition={spinningTransition}
			className="block w-12 h-12 border-4 border-gray-200 border-t-fuchsia-600 rounded-full "
		/>
	</div>
);
