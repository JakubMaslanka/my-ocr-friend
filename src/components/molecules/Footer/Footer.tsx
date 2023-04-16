import React from "react";
import { motion } from "framer-motion";
import { footerAnimationVaritans } from "./Footer.animation";

const Footer: React.FC = () => (
	<footer className="mt-20 mb-10 w-full">
		<motion.div variants={footerAnimationVaritans} initial="hidden" animate="show" exit="exit">
			<p className="mx-auto max-w-3xl pb-2 pt-1 text-center text-xs font-thin text-gray-500 dark:text-gray-400">
				<span>The application doesn&#x27;t store users photos on the server.</span>
			</p>
			<p className="mx-auto max-w-3xl pb-2 pt-1 text-center text-xs font-thin text-gray-500 dark:text-gray-400">
				<span>
					<a href="https://github.com/JakubMaslanka">
						&copy; Jakub Maslanka {new Date(Date.now()).getFullYear()}
					</a>
				</span>
			</p>
		</motion.div>
	</footer>
);

export default Footer;
