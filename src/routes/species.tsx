import {
	AppLayout,
	Box,
	Button,
	Header,
	KeyValuePairs,
	SpaceBetween,
	SplitPanel,
	Table,
	Tabs,
	TextFilter,
} from "@cloudscape-design/components";
import {
	createFileRoute,
	useNavigate,
	useParams,
} from "@tanstack/react-router";
import { useState } from "react";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useSpecie } from "../hooks/useSpecie";
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
	const params = useParams({ strict: false });
	const specie = useSpecie(params.specieId ?? "");

	if (!specie.data) {
		return null;
	}

	return (
		<SplitPanel
			hidePreferencesButton
			closeBehavior="hide"
			header={specie.data.name}
		>
			<Tabs
				tabs={[
					{
						id: "general",
						label: "概要",
						content: (
							<KeyValuePairs
								columns={3}
								items={[
									{
										label: "#",
										value: specie.data.pokemon_species_id,
									},
									{
										label: "名前",
										value: specie.data.name,
									},
									{
										label: "分類",
										value: specie.data.genus,
									},
									{
										label: "高さ",
										value: specie.data.height
											? `${specie.data.height / 10} m`
											: "不明",
									},
									{
										label: "体重",
										value: specie.data.weight
											? `${specie.data.weight / 10} kg`
											: "不明",
									},
								]}
							/>
						),
					},
					{
						id: "moves",
						label: "わざ",
						content: (
							<Table
								columnDefinitions={[
									{ id: "level", header: "レベル", cell: (item) => item.level },
									{ id: "name", header: "名前", cell: (item) => item.name },
									{
										id: "genus",
										header: "分類",
										cell: (item) => item.damage_class,
									},
									{
										id: "description",
										header: "説明",
										cell: (item) => item.flavor_text,
									},
								]}
								items={specie.data.moves ?? []}
								loading={specie.data.moves?.length === 0}
								loadingText="Loading moves"
								empty={
									<Box
										margin={{ vertical: "xs" }}
										textAlign="center"
										color="inherit"
									>
										<SpaceBetween size="m">
											<b>No moves</b>
										</SpaceBetween>
									</Box>
								}
							/>
						),
					},
				]}
			/>
		</SplitPanel>
	);
}
