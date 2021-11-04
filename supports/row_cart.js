class RowCart{
    constructor(product_name,price_per_product, product_quantity, total_price){
        this.product_name = product_name;
        this.price_per_product = price_per_product;
        this.product_quantity = product_quantity;
        this.total_price = total_price;
    }
}
module.exports = {RowCart}