const {HomePage} = require('../pages/home_page');
const {chromium} = require('playwright');
const {test} = require('@jest/globals')
const {location} = require("../../fixtures/data/location_data.json")
const {search_data} = require("../../fixtures/data/search_data.json")



describe('Filter and Sort function', ()=> {
    let browser;
    let context;
    let page

    beforeEach( async () =>{
      browser = await chromium.launch({
        headless: false,
        channel: "chrome"
      })
      context = await browser.newContext();
      page = await context.newPage();
      await page.goto('https://www.hotdeal.vn/');
    },20000)
  
    afterEach(async () => {
        await browser.close()
    },20000);

    test("Filter in catalog", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.click_food_catalog()
        await home_page.click_buffet_filter()
        var product_quantity = await home_page.click_filter_location()
        await home_page.verify_product_quantity(product_quantity)
        var product_location = await home_page.click_open_product_info()
        await home_page.verify_product_location(product_location)
    },30000)

    test.only("Sort in catalog", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.click_food_catalog()
        await home_page.click_buffet_filter()
        await home_page.click_price_sort_filter()
        await home_page.verify_price_sort()
    },30000)
})