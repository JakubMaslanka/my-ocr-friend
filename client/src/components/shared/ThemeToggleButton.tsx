import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';

export const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="transition duration-500 ease-in-out rounded-full p-2">
      <div
        className="flex cursor-pointer"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <div className="relative inline-block w-10 mr-2 align-middle select-none">
          <input onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')} checked={theme === 'dark'} type="checkbox" name="toggle" id="Blue" className="checked:bg-fuchsia-400 outline-none focus:outline-none right-4 checked:right-0 duration-200 ease-in absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" />
          <label onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} htmlFor="Blue" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer">
          </label>
        </div>
        <span className="text-gray-400 font-medium">
          <div className="text-gray-500 dark:text-gray-400 text-2xl cursor-pointer">
            {theme === 'dark' ? (
              <FaSun />
            ) : (
              <FaMoon />
            )}
          </div>
        </span>
      </div>
    </div>
  );
};
