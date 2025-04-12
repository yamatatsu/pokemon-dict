import { createFileRoute } from "@tanstack/react-router";

// The view is defined in the parent route `/species`.
export const Route = createFileRoute("/species/$specieId")();
