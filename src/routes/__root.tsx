import AppLayout from "@cloudscape-design/components/app-layout";
import SideNavigation from "@cloudscape-design/components/side-navigation";
import TopNavigation from "@cloudscape-design/components/top-navigation";
import {
	Outlet,
	createRootRoute,
	useLocation,
	useNavigate,
} from "@tanstack/react-router";

export const Route = createRootRoute({
	component: () => {
		const navigate = useNavigate();
		const { pathname } = useLocation();

		return (
			<>
				<TopNavigation
					identity={{
						href: "#",
						title: "ポケモン図鑑",
					}}
					utilities={[]}
				/>
				<AppLayout
					content={<Outlet />}
					navigation={
						<SideNavigation
							activeHref={pathname}
							onFollow={(event) => {
								event.preventDefault();
								navigate({ to: event.detail.href });
							}}
							items={[{ type: "link", text: "モンスター", href: "/monsters" }]}
						/>
					}
				/>
			</>
		);
	},
});
