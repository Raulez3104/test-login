import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  use: {
    headless: true,
    launchOptions: {
      slowMo: 300, // opcional: lo hace más lento
    },
  },
  webServer: {
    command: "npm run dev",
    port: 5173,
    timeout: 60000,
    reuseExistingServer: !process.env.CI,
  },
});
