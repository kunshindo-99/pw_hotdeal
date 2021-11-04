const {HomePage} = require('../pages/home_page');
const {chromium} = require('playwright');
const {test} = require('@jest/globals')
const {location} = require("../../fixtures/data/location_data.json");
const { ViewCartPage } = require('../pages/view_cart_page');

describe('Buy function', ()=> {
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
    },30000)
  
    afterEach(async () => {
        await browser.close()
    },30000);

    test("Buy success", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        var list_row_cart = await home_page.choose_list_product(3)
        // await console.log(order_total)
        const view_cart_page = new ViewCartPage( await home_page.open_view_cart())
        await view_cart_page.verify_product_info(list_row_cart)
    },100000)

    test("Change order", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        var list_row_cart = await home_page.choose_list_product(5)
        const view_cart_page = new ViewCartPage( await home_page.open_view_cart())
        //change_order
        await view_cart_page.change_order_detail("2","10")
        await view_cart_page.remove_order("3")
        // list start from 0 - change for local cart
        list_row_cart[1].product_quantity = 10
        list_row_cart[1].total_price = (list_row_cart[1].product_quantity * list_row_cart[1].price_per_product).toString()
        list_row_cart.splice(2,1)
        // console.log(list_row_cart)
        await view_cart_page.verify_product_info_change(list_row_cart)
    },100000)

    test.only("Buy sale product", async () =>{
      const home_page = new HomePage(page);
      await home_page.choose_location(location.HaNoi)
      var default_price = await home_page.buy_sale_50_price()
      const view_cart_page = new ViewCartPage( page )
      await view_cart_page.verify_sale_price_50(default_price)
  },10000)
})