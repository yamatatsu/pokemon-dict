import { useQuery } from "urql";
import { graphql } from "../gql";

const query = graphql(`
query specieQuery($id: Int) {
  pokemon_v2_pokemonspeciesname(
    where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}
    limit: 10
  ) {
    name
    genus
    pokemon_species_id
    pokemon_v2_pokemonspecy {
      pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: 11}}) {
        flavor_text
      }
      pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {
        height
        weight
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            pokemon_v2_typenames(where: {language_id: {_eq: 1}}) {
              name
            }
          }
        }
        pokemon_v2_pokemonmoves(
          where: {
            version_group_id: {_eq: 25},
            pokemon_v2_movelearnmethod: {name: {_eq: "level-up"}}
          }
        ) {
          level
          pokemon_v2_move {
            accuracy
            move_effect_chance
            pokemon_v2_movenames(where: {language_id: {_eq: 1}}) {
              name
            }
            pokemon_v2_moveflavortexts(where: {language_id: {_eq: 1}, version_group_id: {_eq: 20}}) {
              flavor_text
            }
            pokemon_v2_movedamageclass {
              pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {
                name
              }
            }
          }
        }
      }
    }
  }
}
`);

type SpecieDetail = {
	pokemon_species_id?: number | null;
	name: string;
	genus: string;
	types?: string;
	height?: number | null;
	weight?: number | null;
	flavor_text?: string;
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
	data: SpecieDetail | undefined;
} {
	const [result] = useQuery({
		query: query,
		variables: { id: Number(id) },
	});

	const data = result.data?.pokemon_v2_pokemonspeciesname?.[0];

	return {
		data: data && {
			pokemon_species_id: data.pokemon_species_id,
			name: data.name,
			genus: data.genus,
			types:
				data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemons[0]?.pokemon_v2_pokemontypes
					.map((type) => type.pokemon_v2_type?.pokemon_v2_typenames[0]?.name)
					.join("/"),
			height: data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemons[0]?.height,
			weight: data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemons[0]?.weight,
			flavor_text:
				data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemonspeciesflavortexts.reduce(
					(acc, flavor) => {
						if (acc.includes(flavor.flavor_text)) {
							return acc;
						}
						return `${acc}\n\n${flavor.flavor_text}`;
					},
					"",
				),
			moves:
				data.pokemon_v2_pokemonspecy?.pokemon_v2_pokemons[0]?.pokemon_v2_pokemonmoves.map(
					(move) => ({
						level: move.level,
						name: move.pokemon_v2_move?.pokemon_v2_movenames[0]?.name,
						accuracy: move.pokemon_v2_move?.accuracy,
						move_effect_chance: move.pokemon_v2_move?.move_effect_chance,
						flavor_text:
							move.pokemon_v2_move?.pokemon_v2_moveflavortexts[0]?.flavor_text,
						damage_class:
							move.pokemon_v2_move?.pokemon_v2_movedamageclass
								?.pokemon_v2_movedamageclassnames[0]?.name,
					}),
				),
		},
	};
}
