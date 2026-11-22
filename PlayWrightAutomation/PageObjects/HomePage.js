const { expect } = require('@playwright/test');

class HomePage {
  constructor(page) {
    this.page = page
    this.logo = page.locator('#nav-logo-sprites')
    this.searchBox = page.locator('#twotabsearchtextbox')
    this.searchButton = page.locator('#nav-search-submit-button');
  }

  async openURL() {
    await this.page.goto('https://www.amazon.com');
  }

  async checkHomePage() {
    await expect(this.logo).toBeVisible();
    await expect(this.searchBox).toBeVisible();
  }

  async searchAnyProduct(productName) {
    await this.searchBox.fill(productName);
    await this.searchButton.click();
  }
}

 module.exports = { HomePage };