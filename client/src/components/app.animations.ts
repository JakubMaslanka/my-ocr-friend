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

export const headerAndFooterSection = {
	hidden: {
		opacity: 0,
		scale: 0.95
	},
	show: {
		opacity: 1,
		scale: 1,
		transition: {
			ease: "easeInOut",
			duration: 0.8
		}
	},
	exit: {
		opacity: 0,
		scale: 0.8
	}
};

export const toastVariants = {
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

export const tooltipVaritans = {
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
