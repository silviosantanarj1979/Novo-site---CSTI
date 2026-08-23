import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Site - CSTI Novo" },
      { name: "description", content: "Site - CSTI Novo" },
      { property: "og:title", content: "Site - CSTI Novo" },
      { property: "og:description", content: "Site - CSTI Novo" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Site - CSTI Novo
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Página em branco pronta para construção.
        </p>
      </div>
    </div>
  );
}
