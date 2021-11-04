const {HomePage} = require('../pages/home_page');
const {chromium} = require('playwright');
const {test} = require('@jest/globals')
const {location} = require("../../fixtures/data/location_data.json")
const {search_data} = require("../../fixtures/data/search_data.json")



describe('Search function', ()=> {
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
    },10000)
  
    afterEach(async () => {
        await browser.close()
    },10000);

    // test("Search placeholder check", async() =>{
    //     const homepage = new HomePage(page);
    //     await homepage.click_btn_confrim_location();
    //     var img1 = await page.screenshot({ path: 'E:/hot_deal_pw/fixtures/Image/default_home.png'});
    //     await homepage.input_search();
    //     var img2 = await page.screenshot({ path: 'E:/hot_deal_pw/fixtures/Image/input_search.png'});
    //     await homepage.remove_search();
    //     var img3 = await page.screenshot({ path: 'E:/hot_deal_pw/fixtures/Image/remove_search.png'});
    //     await homepage.click_link_sign_up();
    //     var img4 = await page.screenshot({ path: 'E:/hot_deal_pw/fixtures/Image/sign_up.png'});
    //     // await expect(img1).toMatchSnapshot(img3)
    // },10000)

    test("Search suggestion", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.input_search(search_data.valid_value);
        await home_page.verify_search_suggestion(search_data.valid_value)
    },20000)



    test("Search results", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.input_search(search_data.valid_value);
        await home_page.click_btn_search();
        await home_page.verify_search_results(search_data.valid_value);
    },20000)

    test("Mapping search suggest and result", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.input_search(search_data.valid_value);
        await home_page.click_btn_search();
        await home_page.click_search_field();
        await home_page.verify_maping_search_suggest_results();
    },20000)

    test("No product found", async () =>{
        const home_page = new HomePage(page);
        await home_page.choose_location(location.HaNoi)
        await home_page.input_search(search_data.invalid_value);
        await home_page.click_btn_search();
        await home_page.verify_mess_no_product_found(search_data.erro_mess_no_product_found);
    },20000)
})