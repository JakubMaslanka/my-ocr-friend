export const tooltipAnimationVaritans = {
	hidden: { y: 50, opacity: 0 },
	show: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.25,
			duration: 0.1,
			ease: "easeIn",
			type: "spring",
			stiffness: 80
		}
	},
	exit: {
		y: 50,
		opacity: 0,
		transition: {
			ease: "easeOut"
		}
	}
};
