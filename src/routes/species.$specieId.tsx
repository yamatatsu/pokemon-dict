import {
	AppLayout,
	Box,
	BreadcrumbGroup,
	Container,
	ContentLayout,
	Grid,
	Header,
	KeyValuePairs,
	SpaceBetween,
	Table,
} from "@cloudscape-design/components";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useSpecie } from "../hooks/useSpecie";

export const Route = createFileRoute("/species/$specieId")({
	component: Component,
});

function Component() {
	const params = Route.useParams();
	const navigate = useNavigate();
	const specie = useSpecie(params.specieId);

	return (
		<AppLayout
			breadcrumbs={
				<BreadcrumbGroup
					items={[
						{ text: "ポケモン", href: "/species" },
						{ text: specie.data?.name ?? "", href: "#" },
					]}
					onClick={(event) => {
						event.preventDefault();
						navigate({ to: event.detail.item.href });
					}}
				/>
			}
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
		<ContentLayout
			header={
				<Header variant="h1">
					#{specie.data.pokemon_species_id} {specie.data.name}
				</Header>
			}
		>
			<Grid
				gridDefinition={[
					{ colspan: { default: 12, s: 6 } },
					{ colspan: { default: 12, s: 6 } },
					{ colspan: { default: 12 } },
					{ colspan: { default: 12 } },
				]}
			>
				<Container>
					<Box textAlign="center">
						<img
							src={specie.data.images.large ?? ""}
							alt="visual of pokemon"
							width={300}
						/>
					</Box>
				</Container>

				<Container header={<Header variant="h2">概要</Header>}>
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
					header={<Header variant="h2">わざ</Header>}
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

				<Container header={<Header variant="h2">説明</Header>}>
					<p style={{ whiteSpace: "pre-wrap" }}>{specie.data.flavor_text}</p>
				</Container>
			</Grid>
		</ContentLayout>
	);
}
