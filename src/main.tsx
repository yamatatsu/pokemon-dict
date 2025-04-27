import "@cloudscape-design/global-styles/index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as UrqlProvider } from "urql";
import { routeTree } from "./routeTree.gen";
import { createClient } from "./urql-client";

const urqlClient = createClient("https://beta.pokeapi.co/graphql/v1beta");

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const container = document.getElementById("root");
if (!container) {
	throw new Error("No container found");
}
const root = createRoot(container);
root.render(
	<React.StrictMode>
		<UrqlProvider value={urqlClient}>
			<RouterProvider router={router} />
		</UrqlProvider>
	</React.StrictMode>,
);
