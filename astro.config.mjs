import { defineConfig } from "astro/config";
import react from "@astrojs/react";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: "https://pedroagentesocial.github.io",
  base: isGitHubActions ? "/wise-energy-pros" : "/",
  integrations: [react()],
});
