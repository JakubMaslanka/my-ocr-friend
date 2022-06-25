import React from "react";

export const Button: React.FC<{ onclick: () => void; text: string }> = ({ onclick, text }) => (
	<div className="flex items-center justify-center">
		<button
			onClick={onclick}
			className="text-md my-2 cursor-pointer border-2 border-gray-800 bg-transparent py-2 px-4 uppercase text-gray-800 hover:bg-gray-800 hover:text-white dark:bg-white dark:text-gray-800 hover:dark:bg-gray-100 md:mt-16"
		>
			{text}
		</button>
	</div>
);
