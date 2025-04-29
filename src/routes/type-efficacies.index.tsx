import {
	AppLayout,
	Badge,
	Box,
	BreadcrumbGroup,
	Header,
	SpaceBetween,
	Table,
} from "@cloudscape-design/components";
import { createFileRoute } from "@tanstack/react-router";
import { PDSideNavigation } from "../components/PDSideNavigation";
import { useTypeMaster } from "../hooks/useTypes";

export const Route = createFileRoute("/type-efficacies/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<AppLayout
			breadcrumbs={
				<BreadcrumbGroup items={[{ text: "タイプ相性", href: "#" }]} />
			}
			content={<TypeEfficacyTable />}
			navigation={<PDSideNavigation />}
			toolsHide
		/>
	);
}

function TypeEfficacyTable() {
	// Get type data
	const { data: types } = useTypeMaster();

	// Early return if data is not loaded
	if (!types) {
		return (
			<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
				<SpaceBetween size="m">
					<b>Loading types...</b>
				</SpaceBetween>
			</Box>
		);
	}

	// Create column definitions for each type
	const columnDefinitions = [
		{
			id: "attackType",
			header: "攻 \\ 防",
			cell: (item: (typeof types)[0]) => <b>{item.name}</b>,
		},
		...types.map((type) => ({
			id: type.id.toString(),
			header: type.name,
			cell: (item: (typeof types)[0]) => {
				// Find the efficacy for this combination
				const efficacy = item.efficacies.find((e) => e.id === type.id);
				const damageFactor = efficacy?.damage_factor ?? 100;

				// Return styled cell based on damage factor
				return <DamageFactorCell damageFactor={damageFactor} />;
			},
		})),
	];

	return (
		<SpaceBetween size="l">
			<Table
				header={<Header>タイプ相性</Header>}
				columnDefinitions={columnDefinitions}
				items={types}
				loadingText="Loading types"
				wrapLines
				stripedRows
				stickyHeader
			/>
		</SpaceBetween>
	);
}

// Helper component for styling cells
function DamageFactorCell({ damageFactor }: { damageFactor: number }) {
	let label = null;

	switch (damageFactor) {
		case 0:
			label = "✕";
			break;
		case 50:
			label = "△";
			break;
		case 200:
			label = "◯";
			break;
	}

	return <Box textAlign="center">{label}</Box>;
}
