class locator{
    //location
    static dropdown_location = "select[name='location']"
    static btn_confrim_location = "button[class='btn btn-success btn-lg btn-block']"

    //signup
    static link_signup = "#user_info_header a" 
    static mess_signup_success = "div[class='alert alert-success']"

    //search
    static input_search = "#search_all"
    static search_suggestion_first = "div[class='tt-search-product product-suggestion first-item tt-suggestion tt-selectable']"
    static search_suggestion = "div[class='tt-search-product product-suggestion tt-suggestion tt-selectable']"
    static button_search = "button[class='btn btn-danger']"
    static search_result = "div[class='col-md-3 product-wrapper  _tracking']"
    static mess_no_product_found = "p[class='well']"

    //buy
    static hot_deal = "#tab0 span[class='view']"
    static btn_add_to_cart = "div[class='add-to-cart__actions add-to-cart-buttons'] #add-to-cart"
    static btn_back_to_all_product ="a[class='breadcrumb__link breadcrumb__link--home']"
    static home_product_price = "div[class='box-price-detail'] span[class='price'] span[class='price__value']"
    static home_product_title = "h1[class='product__title']"
    static btn_open_drop_cart = "span[class='hidden-xs hidden-sm']"
    static btn_view_cart = "li[class='nav-cart open'] div[class='dropdown-menu dropdown-cart'] a[class='btn btn--view-cart']"
    static sale_tag = ".price__discount"
    static view_product = "span[class='view']"
    static btn_buy_now = "button[class='btn btn-success btn--buy-now btn--buy-now-x2']"
    static default_price = "div[class='product__details'] span[class='price price--list-price'] span[class='price__value']"

    //filter - sort
    static food_catalog = "nav[class='header__navigation main-nav']  li[class='branding__item branding branding--an-uong multicolumns'] "
    static buffet_filter = "label[class='filter__button'] a[href='https://www.hotdeal.vn/ha-noi/buffet-am-thuc/']"
    static filter_location = "label[class='filter__button ']"
    static filter_quantity_of_product = "label[class='filter__button '] span"
    static filter_product_info = "div[class='item__meta']"
    static filter_location_active = "div[class='filter__body'] div[id='current-filter-tag']"
    static product_location = "ul[class='feature-list'] div"

    static sort_price = "a[class='btn btn-default sorting sorting--price sorting--desc ']"
    static sort_product_price = "span[class='price'] span[class='price__value']"
}
module.exports = {locator}