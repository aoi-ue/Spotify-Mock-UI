import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

// fetch utils (mock test)
// content with slides (snapshots)
// side menu as router (dom testing)
// hero banner (Pure hook)
