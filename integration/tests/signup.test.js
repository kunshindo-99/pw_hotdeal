const {HomePage} = require("../pages/home_page");
const { chromium } = require('playwright');
const {test} = require("@jest/globals");
const {location} = require("../../fixtures/data/location_data.json")
const {valid_account} = require("../../fixtures/data/valid_account.json")
const {invalid_account} = require("../../fixtures/data/invalid_account.json")

describe("Sign up function", ()=>{
    let browser
    let context
    let page

    beforeEach( async()=>{
        browser = await chromium.launch({
            headless: false,
            channel: "chrome"
        })
        context = await browser.newContext()
        page = await context.newPage()
        await page.goto('https://www.hotdeal.vn/')
    },10000)

    afterEach( async()=>{
        await browser.close()
    },10000)

    test("Input invalid type email", async()=>{
        const homepage = new HomePage(page)
        await homepage.choose_location(location.HaNoi)
        const signup_page = await homepage.click_signup_link()
        await signup_page.input_invalid_email(invalid_account.wrong_type_email)
        await signup_page.verify_input_wrong_email_type()
    })

    test.only("Input valid email", async() =>{
        var homepage = new HomePage(page)
        await homepage.choose_location(location.HaNoi)
        const signup_page = await homepage.click_signup_link()
        homepage = new HomePage( await signup_page.input_valid_account(
            valid_account.email, 
            valid_account.password,
            valid_account.password2,
            valid_account.birthday.day,
            valid_account.birthday.month,
            valid_account.birthday.year,
            valid_account.gender))
        await homepage.verify_success_signup()
    },30000)
})