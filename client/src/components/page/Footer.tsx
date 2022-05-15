import { motion } from "framer-motion";
import { headerAndFooterSection } from "../app.animations";

export const Footer: React.FC = () => (
	<footer className="my-12 w-full">
		<motion.div
			variants={headerAndFooterSection}
			initial="hidden"
			animate="show"
			exit="exit"
		>
			<p className="max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1">
				<span>
					The application doesn&#x27;t store user photos on the server.
				</span>
			</p>
			<p className="max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1">
				<span>
					<a href="https://github.com/JakubMaslanka">
						&copy; Jakub Maslanka {new Date(Date.now()).getFullYear()}
					</a>
				</span>
			</p>
			<p className="max-w-3xl text-xs font-thin mx-auto dark:text-gray-400 text-gray-500 text-center pb-2 pt-1">
				<span>
					API created by <a href="https://github.com/thi-days">@thi-days</a>
				</span>
			</p>
		</motion.div>
	</footer>
);
