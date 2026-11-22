const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../PageObjects/Homepage');
const { SearchPage } = require('../../PageObjects/SearchPage');

test.describe('@ui Search Results Tests', () => {

    let homePage;
    let searchResultsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchResultsPage = new SearchPage(page);
        await homePage.openURL();
        await homePage.searchAnyProduct('wireless mouse');
        await searchResultsPage.verifySearchResults();
    });

    test('TC_03: Apply brand filter and verify results', async ({ page }) => {

        await searchResultsPage.applyFilterBrand();
       await searchResultsPage.verifySearchResults();

    });

    test('TC_04: Open product and verify details', async ({ page }) => {

        await searchResultsPage.openFirstProduct();

        await expect(page.locator('#productTitle')).toBeVisible();
        await expect(page.locator('#landingImage').first()).toBeVisible();
        await expect(page.locator('#acrPopover').first()).toBeVisible();
});

})