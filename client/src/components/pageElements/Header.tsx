import { BsChatText } from 'react-icons/bs';
import { ThemeToggleButton } from '../shared';

export const Header: React.FC = () => (
  <header className="h-24 sm:h-32 flex items-center z-30 w-full">
    <div className="container mx-auto px-6 flex items-center justify-between">
      <div className="uppercase text-gray-800 dark:text-white font-black text-3xl flex items-center">
        <BsChatText size={'32px'} color="#E879F9" />
        <span className="text-xs ml-3 mt-1">
          MY-OCR-FRIEND
        </span>
      </div>
      <ThemeToggleButton />
    </div>
  </header>
);
