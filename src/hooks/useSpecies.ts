import type { ResultOf } from "@graphql-typed-document-node/core";
import { useState } from "react";
import { useQuery } from "urql";
import { graphql } from "../gql";

const query = graphql(`
query speciesQuery($name: String) {
  __typename
  pokemon_v2_pokemonspeciesname(
    where: {
      language_id: {_eq: 1},
      name: {_regex: $name}
    }
    limit: 10
    order_by: {id: asc}
  ) {
    __typename
    id
    name
    genus
    pokemon_species_id
  }
}
`);

export type Specie = ResultOf<
	typeof query
>["pokemon_v2_pokemonspeciesname"][number];

export function useSpecies(): {
	data: Specie[];
	setName: (name: string) => void;
} {
	const [name, setName] = useState("");

	const [result] = useQuery({
		query: query,
		variables: { name },
	});

	return {
		data: result.data?.pokemon_v2_pokemonspeciesname ?? [],
		setName,
	};
}
