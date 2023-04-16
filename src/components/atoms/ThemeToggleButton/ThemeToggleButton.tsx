import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "~/hooks/useTheme";

const ThemeToggleButton = () => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="rounded-full p-2 transition duration-500 ease-in-out">
			<div
				className="flex cursor-pointer"
				onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
			>
				<div className="relative mr-2 inline-block w-10 select-none align-middle">
					<input
						onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
						checked={theme === "dark"}
						type="checkbox"
						name="toggle"
						id="Blue"
						className="absolute right-4 block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-white outline-none duration-200 ease-in checked:right-0 checked:bg-fuchsia-400 focus:outline-none"
					/>
					<label
						onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
						htmlFor="Blue"
						className="block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-300"
					></label>
				</div>
				<span className="font-medium text-gray-400">
					<div className="cursor-pointer text-2xl text-gray-500 dark:text-gray-400">
						{theme === "dark" ? <FaSun /> : <FaMoon />}
					</div>
				</span>
			</div>
		</div>
	);
};

export default ThemeToggleButton;
