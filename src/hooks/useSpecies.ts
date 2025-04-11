import type { ResultOf } from "@graphql-typed-document-node/core";
import { useQuery } from "urql";
import { graphql } from "../gql";

const query = graphql(`
query speciesQuery {
  pokemon_v2_pokemonspeciesname(
    where: {language_id: {_eq: 1}}
    limit: 10
    order_by: {id: asc}
  ) {
    name
    genus
    pokemon_species_id
  }
}
`);

export type Specie = ResultOf<
	typeof query
>["pokemon_v2_pokemonspeciesname"][number];

export function useSpecies(): Specie[] {
	const [result] = useQuery({
		query: query,
	});

	return result.data?.pokemon_v2_pokemonspeciesname ?? [];
}
