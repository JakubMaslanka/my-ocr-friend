import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { LoadingSpinner } from "./components/shared/LoadingSpinner";
import "./index.css";

const LazyApp = lazy(() => import("./components/LazyApp"));

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
	<StrictMode>
		{/* <LoadingSpinner /> */}
		<Suspense fallback={<LoadingSpinner />}>
			<LazyApp />
		</Suspense>
	</StrictMode>
);
