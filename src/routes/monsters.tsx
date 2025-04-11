import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Input from "@cloudscape-design/components/input";
import Modal from "@cloudscape-design/components/modal";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Table from "@cloudscape-design/components/table";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/monsters")({
	component: Component,
});

type Item = {
	id: number;
	title: string;
	content: string;
	done: boolean;
};

function Component() {
	const [selectedTask, setSelectedTask] = useState<Item | null>(null);

	return (
		<Table
			columnDefinitions={[
				{
					id: "title",
					header: "Title",
					cell: (item) => item.title,
				},
				{
					id: "description",
					header: "Description",
					cell: (item) => item.content,
				},
			]}
			items={[]}
			// loading={isLoading}
			loadingText="Loading resources"
			header={<Header>モンスター</Header>}
			empty={
				<Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
					<SpaceBetween size="m">
						<b>No resources</b>
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
