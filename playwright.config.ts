import { devices } from '@playwright/test';
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    testDir: './tests',
    timeout: 30000,
    
    reporter: [
        ['@serenity-js/playwright-test', {
            crew: [
                '@serenity-js/serenity-bdd',
                '@serenity-js/console-reporter',
                ['@serenity-js/core:ArtifactArchiver', { outputDirectory: './target/site/serenity' }],
            ]
        }],
        ['html'],
    ],

    use: {
        baseURL: 'http://localhost:5173',
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
};

export default config;