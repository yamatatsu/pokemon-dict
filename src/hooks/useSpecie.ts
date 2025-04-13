import { useQuery } from "urql";
import { graphql } from "../gql";

const query = graphql(`
query pokemonQuery($id: Int) {
  __typename
  pokemon_v2_pokemon(
    where: {is_default: {_eq: true}, pokemon_species_id: {_eq: $id}}
  ) {
    __typename
    id
    height
    weight
    pokemon_v2_pokemonmoves(
      where: {pokemon_v2_movelearnmethod: {name: {_eq: "level-up"}}, version_group_id: {_eq: 25}}
    ) {
      __typename
      id
      level
      pokemon_v2_move {
        __typename
        id
        accuracy
        move_effect_chance
        pokemon_v2_movenames(where: {language_id: {_eq: 11}}) {
          __typename
          id
          name
        }
        pokemon_v2_moveflavortexts(
          where: {language_id: {_eq: 11}}
          order_by: {version_group_id: desc}
          limit: 1
        ) {
          __typename
          id
          flavor_text
        }
        pokemon_v2_movedamageclass {
          __typename
          id
          pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {
            __typename
            id
            name
          }
        }
      }
    }
    pokemon_v2_pokemontypes {
      __typename
      id
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
    pokemon_v2_pokemonspecy {
      __typename
      id
      pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: 11}}) {
        __typename
        id
        name
        genus
      }
      pokemon_v2_pokemonspeciesflavortexts(
        where: {language_id: {_in: [11, 9]}}
        order_by: {version_id: asc}
      ) {
        __typename
        id
        flavor_text
        pokemon_v2_version {
          __typename
          id
          pokemon_v2_versionnames(where: {language_id: {_eq: 1}}) {
            __typename
            id
            name
          }
        }
        pokemon_v2_language {
          __typename
          id
          iso3166
        }
      }
    }
    pokemon_v2_pokemonsprites {
      __typename
      id
      sprites
    }
  }
}
`);

type PokemonDetail = {
	pokemon_species_id: string;
	name?: string;
	genus?: string;
	types?: string;
	height?: number | null;
	weight?: number | null;
	flavor_texts: Array<{ id: number; text: string; versionName: string }>;
	images: {
		large?: string;
		small?: string;
	};
	moves?: {
		level: number;
		name?: string;
		accuracy?: number | null;
		move_effect_chance?: number | null;
		flavor_text?: string;
		damage_class?: string;
	}[];
};

export function useSpecie(id: string): {
	data: PokemonDetail | undefined;
} {
	const [result] = useQuery({
		query: query,
		variables: { id: Number(id) },
	});

	const data = result.data?.pokemon_v2_pokemon?.[0];

	return {
		data: data && {
			pokemon_species_id: id,
			name: data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0]
				?.name,
			genus:
				data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesnames[0]?.genus,
			types: data.pokemon_v2_pokemontypes
				.map((type) => type.pokemon_v2_type?.pokemon_v2_typenames[0]?.name)
				.join("/"),
			height: data.height,
			weight: data.weight,
			images: {
				large:
					data.pokemon_v2_pokemonsprites[0]?.sprites.other["official-artwork"]
						.front_default,
				small: data.pokemon_v2_pokemonsprites[0]?.sprites.front_default,
			},
			flavor_texts:
				data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts.map(
					(ft) => {
						const versionName =
							ft.pokemon_v2_version?.pokemon_v2_versionnames[0]?.name ?? "";
						const language = ft.pokemon_v2_language?.iso3166 ?? "";
						return {
							id: ft.id,
							text: ft.flavor_text,
							versionName: `${versionName}(${language})`,
						};
					},
				) ?? [],
			moves: data.pokemon_v2_pokemonmoves.map((move) => ({
				level: move.level,
				name: move.pokemon_v2_move?.pokemon_v2_movenames[0]?.name,
				accuracy: move.pokemon_v2_move?.accuracy,
				move_effect_chance: move.pokemon_v2_move?.move_effect_chance,
				flavor_text:
					move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0]?.flavor_text,
				damage_class:
					move.pokemon_v2_move?.pokemon_v2_movedamageclass
						?.pokemon_v2_movedamageclassnames[0]?.name,
			})),
		},
	};
}
