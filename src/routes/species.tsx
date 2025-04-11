import Box from "@cloudscape-design/components/box";
import Header from "@cloudscape-design/components/header";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Table from "@cloudscape-design/components/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { type Specie, useSpecies } from "../hooks/useSpecies";

export const Route = createFileRoute("/species")({
	component: Component,
});

function Component() {
	const [selectedTask, setSelectedTask] = useState<Specie | null>(null);

	const species = useSpecies();

	return (
		<Table
			columnDefinitions={[
				{ id: "id", header: "#", cell: (item) => item.pokemon_species_id },
				{ id: "name", header: "名前", cell: (item) => item.name },
				{ id: "genus", header: "分類", cell: (item) => item.genus },
			]}
			items={species}
			loading={species.length === 0}
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
