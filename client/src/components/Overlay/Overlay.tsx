import React, { Fragment, useContext } from "react";
import { createPortal } from "react-dom";
import { OverlayContext } from "../../context/OverlayContext";
import { OverlayProps } from "./Overlay.props";

const Overlay: React.FC<OverlayProps> = ({ children, isOpen }) => {
	const overlayRootReference = useContext(OverlayContext);

	return isOpen
		? createPortal(<Fragment>{children}</Fragment>, overlayRootReference!.current!)
		: undefined;
};

export default Overlay;
