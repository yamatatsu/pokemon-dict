import TopNavigation from "@cloudscape-design/components/top-navigation";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<TopNavigation
					identity={{
						href: "#",
						title: "ポケモン図鑑",
					}}
					utilities={[]}
				/>
				<Outlet />
			</>
		);
	},
});
