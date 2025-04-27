import { offlineExchange } from "@urql/exchange-graphcache";
import { makeDefaultStorage } from "@urql/exchange-graphcache/default-storage";
import { Client, fetchExchange } from "urql";
import { schema } from "./schema";

const storage = makeDefaultStorage({
	idbName: "yamatatsu/pokemon-dict",
	maxAge: 365,
});

const cache = offlineExchange({
	schema,
	storage,
	logger: (severity, message) => console[severity](message),
});

export const createClient = (url: string) =>
	new Client({
		url,
		exchanges: [cache, fetchExchange],
	});
