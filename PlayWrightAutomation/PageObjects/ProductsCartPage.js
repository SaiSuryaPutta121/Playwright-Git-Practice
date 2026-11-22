
const { expect } = require('@playwright/test');

class ProductsCartPage {
    constructor(page) {
        this.page = page;

        // Product page locators
        this.addToCartButton = page.locator('#add-to-cart-button').nth(0);
        this.cartCount = page.locator('#nav-cart-count');
        this.cartButton = page.locator('#nav-cart');

        // Cart page locators
        this.productName = page.locator('.sc-product-title');
        this.quantity = page.locator('select[name="quantity"]');
        this.subtotal = page.locator("//span[@class='ewc-subtotal-amount']/h2");
        this.checkOutButton = page.locator("//input[@name='proceedToRetailCheckout']");
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async addProductToCart() {
        await this.addToCartButton.click();
        await expect(this.cartCount).toHaveText('1');
    }

    async verifyCartCount() {
        await expect(this.cartCount).toHaveText('1');
    }

    async openCart() {
        await this.cartButton.click();
    }

    async verifyProductName(productName) {
        await expect(this.productName.first()).toContainText(productName);
    }

    async verifyQuantity() {
        await expect(this.quantity.first()).toHaveValue('1');
    }

    async verifySubtotal() {
        await expect(this.subtotal).toBeVisible();
        await expect(this.subtotal).not.toBeEmpty();
    }

    async clickCheckoutandVerifySuccess() {
        await expect(this.checkOutButton).toBeVisible();
        await this.checkOutButton.click();
        await expect(this.continueButton).toBeVisible();

    }
}

module.exports = { ProductsCartPage };
