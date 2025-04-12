/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\nquery specieQuery($id: Int) {\n  pokemon_v2_pokemonspeciesname(\n    where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}\n    limit: 10\n  ) {\n    name\n    genus\n    pokemon_species_id\n    pokemon_v2_pokemonspecy {\n      pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {\n        height\n        weight\n        pokemon_v2_pokemonmoves(\n          where: {\n            version_group_id: {_eq: 25},\n            pokemon_v2_movelearnmethod: {name: {_eq: \"level-up\"}}\n          }\n        ) {\n          level\n          pokemon_v2_move {\n            accuracy\n            move_effect_chance\n            pokemon_v2_movenames(where: {language_id: {_eq: 1}}) {\n              name\n            }\n            pokemon_v2_moveflavortexts(where: {language_id: {_eq: 1}, version_group_id: {_eq: 20}}) {\n              flavor_text\n            }\n            pokemon_v2_movedamageclass {\n              pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": typeof types.SpecieQueryDocument,
    "\nquery speciesQuery($name: String) {\n  pokemon_v2_pokemonspeciesname(\n    where: {\n      language_id: {_eq: 1},\n      name: {_regex: $name}\n    }\n    limit: 10\n    order_by: {id: asc}\n  ) {\n    name\n    genus\n    pokemon_species_id\n  }\n}\n": typeof types.SpeciesQueryDocument,
};
const documents: Documents = {
    "\nquery specieQuery($id: Int) {\n  pokemon_v2_pokemonspeciesname(\n    where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}\n    limit: 10\n  ) {\n    name\n    genus\n    pokemon_species_id\n    pokemon_v2_pokemonspecy {\n      pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {\n        height\n        weight\n        pokemon_v2_pokemonmoves(\n          where: {\n            version_group_id: {_eq: 25},\n            pokemon_v2_movelearnmethod: {name: {_eq: \"level-up\"}}\n          }\n        ) {\n          level\n          pokemon_v2_move {\n            accuracy\n            move_effect_chance\n            pokemon_v2_movenames(where: {language_id: {_eq: 1}}) {\n              name\n            }\n            pokemon_v2_moveflavortexts(where: {language_id: {_eq: 1}, version_group_id: {_eq: 20}}) {\n              flavor_text\n            }\n            pokemon_v2_movedamageclass {\n              pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n": types.SpecieQueryDocument,
    "\nquery speciesQuery($name: String) {\n  pokemon_v2_pokemonspeciesname(\n    where: {\n      language_id: {_eq: 1},\n      name: {_regex: $name}\n    }\n    limit: 10\n    order_by: {id: asc}\n  ) {\n    name\n    genus\n    pokemon_species_id\n  }\n}\n": types.SpeciesQueryDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery specieQuery($id: Int) {\n  pokemon_v2_pokemonspeciesname(\n    where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}\n    limit: 10\n  ) {\n    name\n    genus\n    pokemon_species_id\n    pokemon_v2_pokemonspecy {\n      pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {\n        height\n        weight\n        pokemon_v2_pokemonmoves(\n          where: {\n            version_group_id: {_eq: 25},\n            pokemon_v2_movelearnmethod: {name: {_eq: \"level-up\"}}\n          }\n        ) {\n          level\n          pokemon_v2_move {\n            accuracy\n            move_effect_chance\n            pokemon_v2_movenames(where: {language_id: {_eq: 1}}) {\n              name\n            }\n            pokemon_v2_moveflavortexts(where: {language_id: {_eq: 1}, version_group_id: {_eq: 20}}) {\n              flavor_text\n            }\n            pokemon_v2_movedamageclass {\n              pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery specieQuery($id: Int) {\n  pokemon_v2_pokemonspeciesname(\n    where: {language_id: {_eq: 1}, pokemon_species_id: {_eq: $id}}\n    limit: 10\n  ) {\n    name\n    genus\n    pokemon_species_id\n    pokemon_v2_pokemonspecy {\n      pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {\n        height\n        weight\n        pokemon_v2_pokemonmoves(\n          where: {\n            version_group_id: {_eq: 25},\n            pokemon_v2_movelearnmethod: {name: {_eq: \"level-up\"}}\n          }\n        ) {\n          level\n          pokemon_v2_move {\n            accuracy\n            move_effect_chance\n            pokemon_v2_movenames(where: {language_id: {_eq: 1}}) {\n              name\n            }\n            pokemon_v2_moveflavortexts(where: {language_id: {_eq: 1}, version_group_id: {_eq: 20}}) {\n              flavor_text\n            }\n            pokemon_v2_movedamageclass {\n              pokemon_v2_movedamageclassnames(where: {language_id: {_eq: 1}}) {\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\nquery speciesQuery($name: String) {\n  pokemon_v2_pokemonspeciesname(\n    where: {\n      language_id: {_eq: 1},\n      name: {_regex: $name}\n    }\n    limit: 10\n    order_by: {id: asc}\n  ) {\n    name\n    genus\n    pokemon_species_id\n  }\n}\n"): (typeof documents)["\nquery speciesQuery($name: String) {\n  pokemon_v2_pokemonspeciesname(\n    where: {\n      language_id: {_eq: 1},\n      name: {_regex: $name}\n    }\n    limit: 10\n    order_by: {id: asc}\n  ) {\n    name\n    genus\n    pokemon_species_id\n  }\n}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;