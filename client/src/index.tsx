import React, { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import LoadingSpinner from "./components/atoms/LoadingSpinner";

import "./index.css";

const App = lazy(() => import("./App"));

const container = document.querySelector("#root") as HTMLDivElement;
const root = createRoot(container);

root.render(
	<StrictMode>
		<Suspense fallback={<LoadingSpinner />}>
			<App />
		</Suspense>
	</StrictMode>
);
