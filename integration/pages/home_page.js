const { BasePage } = require("./base_page");
const { locator } = require("../locators/homepage_locator"); 
const { SignupPage } = require("./signup_page");
const { RowCart } = require("../../supports/row_cart");

class HomePage extends BasePage{
    constructor(page){
        super(page);
    }

    //confirm location
    async choose_location(option_value){
        await this.choose_from_dropdown(locator.dropdown_location,option_value)
        await this.click_element(locator.btn_confrim_location)
        return this.page
    }

    //click_link_signup
    async click_signup_link(){
        await this.click_element(locator.link_signup)
        return new SignupPage(this.page)
    }

    //search
    async input_search(text){
        await this.input_text_to_element(locator.input_search,text)
        return this.page
    }

    async click_btn_search(){
        await this.click_element(locator.button_search)
        return this.page
    }

    async click_search_field(){
        await this.click_element(locator.input_search)
        return this.page
    }

    //buy
    async choose_list_product(number_of_product){
        var list_row_cart = []; 
        for( var i=0; i<number_of_product; i++){
            var list_product_element = await this.get_list_element(locator.hot_deal)
            await list_product_element[i].click()
            var product_name = await this.get_data_from_element(locator.home_product_title)
            var price_per_product = await this.get_data_from_element(locator.home_product_price)
            // await console.log(data1)
            // await console.log(data2)
            product_name = product_name.toLowerCase()
            price_per_product =  price_per_product.replace(/,/g,'')
            var total = price_per_product * 1
            var row_cart = new RowCart(product_name,price_per_product,1,total.toString())
            list_row_cart.unshift(row_cart)
            await this.click_element(locator.btn_add_to_cart)
            await this.click_element(locator.btn_back_to_all_product)
        }
        return list_row_cart
    }

    async buy_sale_50_price(){
        var list_sale = await this.get_list_element(locator.sale_tag)
        for( var i=0; i<list_sale.length; i++){
            var data = await list_sale[i].innerText()
            data= data.replace("%","")
            // console.log(data)
            if(data == "-50"){
                // console.log(i)
                var list_view = await this.get_list_element(locator.view_product)
                await list_view[i].click()
                var default_price =  await this.get_data_from_element(locator.default_price)
                default_price = default_price.replace(/,/g,"")
                await this.click_element(locator.btn_buy_now)
                return default_price
            }
        }
    }

    async open_view_cart(){
        await this.click_element(locator.btn_open_drop_cart)
        await this.click_element(locator.btn_view_cart)
        return this.page
    }

    //filter

    async click_food_catalog(){
        await this.click_element(locator.food_catalog)
        return this.page
    }

    async click_buffet_filter(){
        await this.click_element(locator.buffet_filter)
        return this.page
    }

    async click_filter_location(){
        var data = await this.get_data_from_element(locator.filter_quantity_of_product)
        // await console.log(data)
        await this.click_element(locator.filter_location)
        return data
    }

    async click_open_product_info(){
        await this.page.waitForNavigation()
        var data = await this.get_data_from_element(locator.filter_location_active)
        // console.log(data)
        var list_product_element = await this.get_list_element(locator.filter_product_info)
        // await console.log(list_product_element.length)
        await list_product_element[0].click()
        
        // var data = await this.get_data_from_element(locator.product_location)
        return data
    }

    //verify_filter
    async verify_product_quantity(number){
        await this.verify_list_element_have_count(locator.filter_product_info,number)
        return this.page
    }

    async verify_product_location(location){
        await this.verify_element_innerHTML_contain_text(locator.product_location,location.toLowerCase())
        return this.page
    }

    //sort

    async click_price_sort_filter(){
        await this.click_element(locator.sort_price)
        return this.page
    }

    async verify_price_sort(){
        await this.page.waitForNavigation()
        var list_product_element = await this.get_list_element(locator.sort_product_price)
        var list_price = []
        for( var i=0; i<list_product_element.length; i++){
            var data = await list_product_element[i].innerText()
            list_price.push(data.replace(/,/g,''))
        }
        // console.log(list_price)
        await this.verify_list_sort_des(list_price)
        return this.page
    }

    //verify_signup_success_mess
    async verify_success_signup(){
        await this.verify_element_innerHTML(locator.mess_signup_success,'<strong>Thành công !</strong><br> Đăng ký tài khoản thành công.')
        return this.page
    }

    //verify_search
    async verify_search_suggestion(text){
        await this.verify_element_innerHTML_contain_text(locator.search_suggestion_first,text) 
        await this.verify_list_element_contain_text(locator.search_suggestion,text)
        return this.page
    }

    async verify_search_results(text){
        await this.verify_list_element_contain_text(locator.search_result,text)
        return this.page
    }

    async verify_maping_search_suggest_results(){
        await this.verify_list_element_contain_in_list(locator.search_suggestion_first,locator.search_suggestion,locator.search_result)
        return this.page
    }

    async verify_mess_no_product_found(text){
        await this.verify_element_innerText(locator.mess_no_product_found,text)
        return this.page
    }
}
module.exports = {HomePage}