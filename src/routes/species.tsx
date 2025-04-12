import {
	AppLayout,
	Box,
	Button,
	Header,
	SpaceBetween,
	SplitPanel,
	Table,
	TextFilter,
} from "@cloudscape-design/components";
import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { useState } from "react";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useSpecies } from "../hooks/useSpecies";

export const Route = createFileRoute("/species")({
	component: Component,
});

function Component() {
	const navigate = useNavigate();

	const params = useParams({ strict: false });

	return (
		<AppLayout
			content={<SpecieTable />}
			onSplitPanelToggle={(event) => {
				if (!event.detail.open) {
					navigate({ to: "/species" });
				}
			}}
			splitPanelOpen={!!params.specieId}
			splitPanel={<SpecieDetailSplitPanel />}
			navigation={<PDSideNavigation />}
		/>
	);
}

function SpecieTable() {
	const [searchName, setSearchName] = useState("");

	const params = useParams({ strict: false });
	const navigate = useNavigate();

	const species = useSpecies();
	const selectedSpecie = species.data.find(
		(s) => s.pokemon_species_id?.toString() === params.specieId,
	);

	return (
		<Table
			columnDefinitions={[
				{ id: "id", header: "#", cell: (item) => item.pokemon_species_id },
				{ id: "name", header: "名前", cell: (item) => item.name },
				{ id: "genus", header: "分類", cell: (item) => item.genus },
			]}
			items={species.data}
			loading={species.data.length === 0}
			loadingText="Loading resources"
			header={<Header>ポケモン</Header>}
			empty={
				<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
					<SpaceBetween size="m">
						<b>No species</b>
					</SpaceBetween>
				</Box>
			}
			filter={
				<>
					<TextFilter
						filteringPlaceholder="pokemon name"
						filteringText={searchName}
						countText="0 matches"
						onChange={({ detail }) => {
							const name = detail.filteringText;
							setSearchName(name);
						}}
					/>
					<Button onClick={() => species.setName(searchName)}>検索</Button>
				</>
			}
			selectionType="single"
			selectedItems={selectedSpecie ? [selectedSpecie] : []}
			onSelectionChange={({ detail }) => {
				const specieId =
					detail.selectedItems[0]?.pokemon_species_id?.toString();
				if (!specieId) return;
				navigate({ to: "/species/$specieId", params: { specieId } });
			}}
		/>
	);
}

function SpecieDetailSplitPanel() {
	return (
		<SplitPanel hidePreferencesButton closeBehavior="hide" header="ポケモン">
			ポケモン
		</SplitPanel>
	);
}
