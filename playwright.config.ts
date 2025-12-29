import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: './src/tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI if resources are tight (optional) */
    workers: process.env.CI ? 2 : undefined,
    /* Reporter to use. 'html' is great because we upload this folder in GitHub Actions */
    reporter: 'html',

    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://www.saucedemo.com', // Replace with your actual app URL

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',

        /* Take a screenshot only when a test fails to save storage */
        screenshot: 'only-on-failure',

        /* Record video only when retrying a failure (useful for debugging CI) */
        video: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        // You can comment these out if you only want to start with Chrome
        //{
        //  name: 'firefox',
        //use: { ...devices['Desktop Firefox'] },
        //},
        //{
        //  name: 'webkit',
        // use: { ...devices['Desktop Safari'] },
        // },
    ],
});