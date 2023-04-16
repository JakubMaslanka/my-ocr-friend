export const mainSection = {
	hidden: { scale: 0 },
	show: {
		scale: 1,
		transition: {
			delay: 0.5,
			type: "spring",
			damping: 8,
			mass: 0.2,
			staggerChildren: 0.4,
			when: "beforeChildren"
		}
	},
	exit: {
		scale: 0,
		transition: {
			ease: "easeInOut"
		}
	}
};

export const mainChildrenVariants = {
	hidden: {
		opacity: 0,
		y: 20
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			ease: "easeInOut"
		}
	},
	exit: {
		opacity: 0,
		y: 20
	}
};
