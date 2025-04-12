import "@cloudscape-design/global-styles/index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import React from "react";
import { createRoot } from "react-dom/client";
import { Client, Provider as UrqlProvider, fetchExchange } from "urql";
import { routeTree } from "./routeTree.gen";
import { schema } from "./schema";

const storage = makeDefaultStorage({
	idbName: "yamatatsu/pokemon-dict",
	maxAge: 7,
});

const cache = offlineExchange({
	schema,
	storage,
	logger: (severity, message) => console[severity](message),
});

const client = new Client({
	url: "https://beta.pokeapi.co/graphql/v1beta",
	exchanges: [cache, fetchExchange],
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
