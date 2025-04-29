import SideNavigation from "@cloudscape-design/components/side-navigation";
import { useLocation, useNavigate } from "@tanstack/react-router";

export function PDSideNavigation() {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	return (
		<SideNavigation
			activeHref={pathname}
			onFollow={(event) => {
				event.preventDefault();
				navigate({ to: event.detail.href });
			}}
			items={[
				{ type: "link", text: "ポケモン", href: "/species" },
				{ type: "link", text: "タイプ相性", href: "/type-efficacies" },
			]}
		/>
	);
}
