export const notificationContainerAnimationVariants = {
	hidden: { x: 1000, opacity: 0 },
	show: {
		x: 0,
		opacity: 1,
		transition: {
			duration: 0.4,
			delay: 0.15,
			type: "spring",
			stiffness: 60
		}
	},
	exit: {
		x: 1000,
		opacity: 0,
		transition: {
			ease: "easeInOut"
		}
	}
};
