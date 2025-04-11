import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Modal from "@cloudscape-design/components/modal";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Table from "@cloudscape-design/components/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { gql, useQuery } from "urql";

const speciesQuery = gql`
query samplePokeAPIquery {
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
`;

export const Route = createFileRoute("/species")({
	component: Component,
});

type PokemonSpeciesName = {
	pokemon_species_id: number;
	name: string;
	genus: string;
};

function Component() {
	const [selectedTask, setSelectedTask] = useState<PokemonSpeciesName | null>(
		null,
	);

	const [result] = useQuery({
		query: speciesQuery,
	});

	return (
		<Table
			columnDefinitions={[
				{ id: "id", header: "#", cell: (item) => item.pokemon_species_id },
				{ id: "name", header: "名前", cell: (item) => item.name },
				{ id: "genus", header: "分類", cell: (item) => item.genus },
			]}
			items={result.data?.pokemon_v2_pokemonspeciesname ?? []}
			loading={result.fetching}
			loadingText="Loading resources"
			header={<Header>ポケモン</Header>}
			empty={
				<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
					<SpaceBetween size="m">
						<b>No species</b>
					</SpaceBetween>
				</Box>
			}
			selectionType="single"
			selectedItems={selectedTask ? [selectedTask] : []}
			onSelectionChange={({ detail }) =>
				setSelectedTask(detail.selectedItems[0])
			}
		/>
	);
}
