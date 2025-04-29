import { useQuery } from "urql";
import { graphql } from "../gql";

const query = graphql(`
query typeQuery($id: Int) {
  __typename
  pokemon_v2_type {
    __typename
    id
    pokemon_v2_typenames(where: {language_id: {_eq: 11}}) {
      __typename
      id
      name
    }
    pokemonV2TypeefficaciesByTargetTypeId {
      __typename
      id
      damage_factor
      pokemon_v2_type {
        __typename
        id
        pokemon_v2_typenames(where: {language_id: {_eq: 11}}) {
          __typename
          id
          name
        }
      }
    }
  }
}
`);

type TypeMaster = Array<{
	id: number;
	name: string;
	efficacies: Array<{
		id?: number;
		name?: string;
		damage_factor?: number;
	}>;
}>;

export function useTypeMaster(): {
	data: TypeMaster | undefined;
} {
	const [result] = useQuery({
		query: query,
	});

	const data = result.data?.pokemon_v2_type ?? [];

	return {
		data: data.map((type) => ({
			id: type.id,
			name: type.pokemon_v2_typenames[0]?.name,
			efficacies: type.pokemonV2TypeefficaciesByTargetTypeId.map(
				(efficacy) => ({
					id: efficacy.pokemon_v2_type?.id,
					name: efficacy.pokemon_v2_type?.pokemon_v2_typenames[0]?.name,
					damage_factor: efficacy.damage_factor,
				}),
			),
		})),
	};
}
