import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Authentication', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test('should log in successfully with valid credentials', async ({ page }) => {
        // Perform actions using the POM
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Check URL or a specific element on the dashboard
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('should log in successfully with valid credentials copy', async ({ page }) => {
        // Perform actions using the POM
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Check URL or a specific element on the dashboard
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('should log in successfully with valid credentials copy_2', async ({ page }) => {
        // Perform actions using the POM
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Check URL or a specific element on the dashboard
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('should log in successfully with valid credentials copy_3', async ({ page }) => {
        // Perform actions using the POM
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Check URL or a specific element on the dashboard
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('should log in successfully with valid credentials copy_4', async ({ page }) => {
        // Perform actions using the POM
        await loginPage.login('standard_user', 'secret_sauce');

        // Assertion: Check URL or a specific element on the dashboard
        await expect(page).toHaveURL(/.*inventory/);
    });

    test('should show an error with invalid credentials', async () => {
        await loginPage.login('invalid_user', 'wrong_pass');

        // Assertion: Check visibility of the error message defined in POM
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match');
    });
});