import "@cloudscape-design/global-styles/index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import { createRoot } from "react-dom/client";
import {
	Client,
	Provider as UrqlProvider,
	cacheExchange,
	fetchExchange,
} from "urql";
import { routeTree } from "./routeTree.gen";

const client = new Client({
	url: "https://beta.pokeapi.co/graphql/v1beta",
	exchanges: [cacheExchange, fetchExchange],
});

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
		<UrqlProvider value={client}>
			<RouterProvider router={router} />
		</UrqlProvider>
	</React.StrictMode>,
);
