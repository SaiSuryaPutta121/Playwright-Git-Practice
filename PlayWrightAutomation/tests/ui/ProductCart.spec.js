
const { test } = require('@playwright/test');
const { HomePage } = require('../../PageObjects/Homepage');
const { ProductsCartPage } = require('../../PageObjects/ProductsCartPage');

test.describe('@ui Product Cart Tests', () => {

    let homePage;
    let productCartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productCartPage = new ProductsCartPage(page);
        await homePage.openURL();
        await homePage.searchAnyProduct('HP 250 Dual Mouse');
        await page.locator('[data-component-type="s-search-result"] h2')
            .first().click();
    });

    test('TC_05: Add product to cart and verify cart count', async () => {
        await productCartPage.addProductToCart();
        await productCartPage.verifyCartCount();
    });

    test('TC_06: Verify product, quantity and subtotal in cart', async () => {
        await productCartPage.addProductToCart();
        await productCartPage.openCart();
        await productCartPage.verifyProductName('HP 250 Dual Mouse');
        await productCartPage.clickCheckoutandVerifySuccess();
    });

    
});
