import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  use: {
    headless: true,
    launchOptions: { slowMo: 300 },
  },
  webServer: undefined, // No levantar servidor
});
