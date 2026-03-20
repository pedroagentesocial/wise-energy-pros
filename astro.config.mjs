import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://pedroagentesocial.github.io",
  base: "/wise-energy-pros",
  integrations: [react()],
});
