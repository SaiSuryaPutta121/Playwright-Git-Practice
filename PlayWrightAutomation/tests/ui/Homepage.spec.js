const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../PageObjects/Homepage');

test.describe('@ui UI Tests', () => {
let homePage;

test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.openURL();
});

test('TC1: Verify homepage', async ({ page }) => {

    await expect(page).toHaveTitle(/Amazon/i);

    await homePage.checkHomePage();

});

test('TC_02: Search wireless mouse', async ({ page }) => {

    await homePage.searchAnyProduct('wireless mouse');

    const searchResults = page.locator(
        '[data-component-type="s-search-result"]'
    );

    await expect(searchResults.first()).toBeVisible();

    await expect(
        page.getByText(/HP 250 Dual Mouse/i).first()
    ).toBeVisible();

});
});
