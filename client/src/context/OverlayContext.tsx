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
	const overlayRootRef = useRef<HTMLElement | null>(null);

	const handleOverlayContainerRef = useCallback((node: HTMLElement | null) => {
		overlayRootRef.current = node;
	}, []);

	return (
		<OverlayContext.Provider value={overlayRootRef}>
			<div id={"overlay-root"} ref={handleOverlayContainerRef} />
			{children}
		</OverlayContext.Provider>
	);
};

const OverlayContext = createContext<
	MutableRefObject<HTMLElement | null> | undefined
>(undefined);

function useOverlay() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	return { isOpen, open, close };
}

export { OverlayContext, useOverlay };
export type { UseOverlay };
export default OverlayProvider;
