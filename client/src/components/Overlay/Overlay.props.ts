import { ReactNode } from "react";
import { UseOverlay } from "../../context/OverlayContext";

export type OverlayProps = Pick<UseOverlay, "isOpen"> & { children: ReactNode };
