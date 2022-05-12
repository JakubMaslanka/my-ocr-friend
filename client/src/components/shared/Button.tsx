export const Button: React.FC<{ onclick: () => void; text: string }> = ({
	onclick,
	text
}) => (
	<div className="flex items-center justify-center">
		<button
			onClick={onclick}
			className="uppercase py-2 my-2 px-4 md:mt-16 bg-transparent dark:text-gray-800 dark:bg-white hover:dark:bg-gray-100 border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white text-md cursor-pointer"
		>
			{text}
		</button>
	</div>
);
