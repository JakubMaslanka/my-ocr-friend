import React from "react";
import { motion } from "framer-motion";
import { BsChatText } from "react-icons/bs";
import { headerAndFooterSection } from "../app.animations";
import { ThemeToggleButton } from "../shared";

export const Header: React.FC = () => (
	<header className="z-30 flex h-24 w-full items-center sm:h-32">
		<motion.div
			variants={headerAndFooterSection}
			initial="hidden"
			animate="show"
			exit="exit"
			className="container mx-auto flex items-center justify-between px-6"
		>
			<div className="flex items-center text-3xl font-black uppercase text-gray-800 dark:text-white">
				<BsChatText size={"32px"} color="#E879F9" />
				<span className="ml-3 mt-1 text-xs">MY-OCR-FRIEND</span>
			</div>
			<ThemeToggleButton />
		</motion.div>
	</header>
);
