import React from "react";
import { SliderButtonProps } from "./SliderButton.props";

const SliderButton: React.FC<SliderButtonProps> = ({ setOpen, text }) => (
	//TODO: add animation to SliderButton on page load and on hover
	<div className="absolute right-0 z-50 flex h-screen w-8 items-center justify-center">
		<div
			onClick={() => setOpen(true)}
			className="inline-block cursor-pointer transition-transform duration-100 ease-in-out hover:translate-x-1"
		>
			<div className="relative h-8 w-full bg-fuchsia-400">
				<div
					style={{
						borderBottomRightRadius: "100%"
					}}
					className="absolute top-[-1px] left-[-1px] z-10 h-[34px] w-full border-0 bg-white dark:bg-gray-800"
				></div>
			</div>
			<p
				className="z-30 rotate-180 transform cursor-pointer rounded-r-lg bg-fuchsia-400 px-3 py-4 font-sans text-xs font-semibold leading-3 text-gray-800 dark:text-white"
				style={{ writingMode: "vertical-rl" }}
			>
				{text}
			</p>
			<div className="relative h-8 w-full bg-fuchsia-400">
				<div
					style={{
						borderTopRightRadius: "100%"
					}}
					className="absolute bottom-[-1px] left-[-1px] h-[34px] w-full bg-white dark:bg-gray-800"
				></div>
			</div>
		</div>
	</div>
);

export default SliderButton;
