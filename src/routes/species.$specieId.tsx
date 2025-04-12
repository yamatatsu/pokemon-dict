import {
	AppLayout,
	Box,
	Container,
	KeyValuePairs,
	SpaceBetween,
	Table,
} from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useSpecie } from "../hooks/useSpecie";

export const Route = createFileRoute("/species/$specieId")({
	component: Component,
});

function Component() {
	return (
		<AppLayout
			content={<SpecieDetail />}
			navigation={<PDSideNavigation />}
			toolsHide
		/>
	);
}

function SpecieDetail() {
	const params = Route.useParams();
	const specie = useSpecie(params.specieId);

	if (!specie.data) {
		return null;
	}

	return (
		<>
			<Container
				header={
					<h1>
						#{specie.data.pokemon_species_id} {specie.data.name}
					</h1>
				}
			>
				<KeyValuePairs
					columns={4}
					items={[
						{
							label: "分類",
							value: specie.data.genus,
						},
						{
							label: "タイプ",
							value: specie.data.types,
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
			</Container>

			<Table
				header={<h2>わざ</h2>}
				columnDefinitions={[
					{
						id: "level",
						header: "レベル",
						cell: (item) => item.level,
					},
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
					<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
						<SpaceBetween size="m">
							<b>No moves</b>
						</SpaceBetween>
					</Box>
				}
			/>

			<Container header={<h2>説明</h2>}>
				<p style={{ whiteSpace: "pre-wrap" }}>{specie.data.flavor_text}</p>
			</Container>
		</>
	);
}
