import {
	AppLayout,
	Box,
	BreadcrumbGroup,
	Button,
	Input,
	Link,
	SpaceBetween,
	Table,
	TextFilter,
} from "@cloudscape-design/components";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useSpecies } from "../hooks/useSpecies";

export const Route = createFileRoute("/species/")({
	component: Component,
});

function Component() {
	return (
		<AppLayout
			breadcrumbs={
				<BreadcrumbGroup items={[{ text: "ポケモン", href: "#" }]} />
			}
			content={<SpecieTable />}
			navigation={<PDSideNavigation />}
			toolsHide
		/>
	);
}

function SpecieTable() {
	const navigate = useNavigate();

	const species = useSpecies();

	return (
		<Table
			columnDefinitions={[
				{ id: "id", header: "#", cell: (item) => item.pokemon_species_id },
				{
					id: "name",
					header: "名前",
					cell: (item) => (
						<Link
							onClick={() => {
								const specieId = item.pokemon_species_id?.toString();
								if (!specieId) return;
								navigate({ to: "/species/$specieId", params: { specieId } });
							}}
						>
							{item.name}
						</Link>
					),
				},
				{ id: "genus", header: "分類", cell: (item) => item.genus },
			]}
			items={species.data}
			loading={species.data.length === 0}
			loadingText="Loading resources"
			empty={
				<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
					<SpaceBetween size="m">
						<b>No species</b>
					</SpaceBetween>
				</Box>
			}
			filter={
				<FilterForm
					defaultValue={species.searchName}
					onClickButton={species.setSearchName}
				/>
			}
		/>
	);
}

function FilterForm(props: {
	defaultValue: string;
	onClickButton: (name: string) => void;
}) {
	const [searchName, setSearchName] = useState(props.defaultValue);

	return (
		<Input
			value={searchName}
			onChange={({ detail }) => setSearchName(detail.value)}
			onBlur={() => props.onClickButton(searchName)}
		/>
	);
}
