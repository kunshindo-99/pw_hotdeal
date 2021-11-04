class locator{
    static product_name = "tbody td[class='name']"  
    static product_price_per_product = "tbody td[class='unit']"
    static product_quantity = "tbody td[class='name']"
    static total_price = "tbody td[class='total']"
    static order_total = "#order-total"
    static btn_remove_product1 = "tbody tr:nth-of-type("
    static btn_remove_product2 =") a";
    static drop_product_quantity1 = "tbody tr:nth-of-type("
    static drop_product_quantity2 = ") select"
    static btn_confirm_remove_product = '#confirnYes';

}
module.exports = {locator}