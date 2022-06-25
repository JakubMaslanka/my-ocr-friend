import React, {
	createContext,
	MutableRefObject,
	ReactNode,
	useCallback,
	useRef,
	useState
} from "react";

interface UseOverlay {
	isOpen: boolean;
	open: () => void;
	close: () => void;
}

const OverlayProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const overlayRootReference = useRef<HTMLElement | null>(null);

	const handleOverlayContainerReference = useCallback((node: HTMLElement | null) => {
		overlayRootReference.current = node;
	}, []);

	return (
		<OverlayContext.Provider value={overlayRootReference}>
			<div id={"overlay-root"} ref={handleOverlayContainerReference} />
			{children}
		</OverlayContext.Provider>
	);
};

const OverlayContext = createContext<MutableRefObject<HTMLElement | null> | undefined>(undefined);

function useOverlay() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return { isOpen, open, close };
}

export { OverlayContext, useOverlay };
export type { UseOverlay };
export default OverlayProvider;
