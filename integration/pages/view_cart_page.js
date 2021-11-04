const {locator} = require( "../locators/view_cart_locator");
const {BasePage} = require( "./base_page");

class ViewCartPage extends BasePage{
    constructor(page){
        super(page);
    }

    async change_order_detail(index_change, number_change){
        var change_number = 2*index_change -1
        var locator_change = locator.drop_product_quantity1 + change_number.toString() + locator.drop_product_quantity2
        await this.choose_from_dropdown(locator_change,number_change)
        return this.page
    }

    async remove_order(index_remove){
        var remove_number = 2*index_remove -1
        var locator_remove = locator.btn_remove_product1 + remove_number.toString() + locator.btn_remove_product2
        await this.click_element(locator_remove)
        await this.click_element(locator.btn_confirm_remove_product)
        await this.page.waitForLoadState('domcontentloaded');
        return this.page
    }

    async verify_product_info(list_row_cart){
        await this.verify_maping_list_element_and_array(locator.product_name,list_row_cart,"product_name")
        await this.verify_maping_list_element_and_array(locator.product_price_per_product,list_row_cart,"price_per_product")
        await this.verify_maping_list_element_and_array(locator.total_price,list_row_cart,"total_price")
        var order_total = 0
        for(var i=0; i<list_row_cart.length; i++){
            order_total += parseFloat(list_row_cart[i].total_price)
        }
        await this.verify_element_currency_text(locator.order_total,order_total.toString())
        return this.page
    }

    async verify_product_info_change(list_row_cart){
        // console.log(list_row_cart)
        await this.verify_maping_list_element_and_array(locator.product_price_per_product,list_row_cart,"price_per_product")
        await this.verify_maping_list_element_and_array(locator.total_price,list_row_cart,"total_price")
        var order_total = 0
        for(var i=0; i<list_row_cart.length; i++){
            order_total += parseFloat(list_row_cart[i].total_price)
        }
        await this.verify_element_currency_text(locator.order_total,order_total.toString())
        return this.page
    }

    async verify_sale_price_50(price){
        var data = (parseFloat(price)/2).toString()
        // console.log(data)
        await this.verify_element_currency_text(locator.product_price_per_product,data)
        return this.page
    }
}
module.exports = {ViewCartPage}