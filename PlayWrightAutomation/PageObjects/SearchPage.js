const { expect } = require('@playwright/test');

class SearchPage {
  constructor(page) {
    this.page = page;
    this.firstProduct = page.locator('[data-component-type="s-search-result"]').first();
    this.filterSection = page.locator('#brandsRefinements');
  }

  async applyFilterBrand() {
    await this.filterSection.waitFor({ state: 'visible' });

    const brandCheckbox = this.filterSection.locator('input[type="checkbox"]').first();

    await brandCheckbox.check({ force: true });

    await expect(brandCheckbox).toBeChecked();
  }

  async verifySearchResults() {
    const searchResults = this.page.locator('[data-component-type="s-search-result"]');
    await expect(searchResults.first()).toBeVisible();
  }

  async openFirstProduct() {
    const productLink = this.firstProduct.locator('//a/h2/span').first();

    await expect(productLink).toBeVisible();

    await productLink.click();
  }
}

module.exports = { SearchPage };