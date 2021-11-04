const { locator } = require("../locators/signup_locator");
const { BasePage } = require("./base_page");
const { HomePage } = require("./home_page");


class SignupPage extends BasePage{
    constructor(page){
        super(page)
    }

    async input_invalid_email(text){
        await this.input_text_to_element(locator.input_email,text)
        await this.hover_element(locator.err_email_icon)
        return this.page
    } 

    async verify_input_wrong_email_type(){
        await this.verify_element_have_attribute(locator.err_email_type,'data-fv-result',"INVALID")
        await this.verify_element_have_attribute(locator.btn_sign_up,'class','btn btn-lg btn-success btn-block disabled')
        await this.verify_element_innerText(locator.err_email_text,"Email không hợp lệ")
        return this.page
    }

    async input_valid_account(email, password, password2, birth_day, birth_month, birth_year, gender){
        await this.input_text_to_element(locator.input_email,email)
        await this.input_text_to_element(locator.password_input,password)
        await this.input_text_to_element(locator.confirm_password_input,password2)
        await this.click_element(locator.birthday_picker)
        await this.click_element(locator.month_dropdown)
        await this.choose_from_dropdown(locator.month_dropdown,birth_month)
        await this.click_element(locator.year_dropdown)
        await this.choose_from_dropdown(locator.year_dropdown,birth_year)
        var day_select = locator.day_select1+birth_day+locator.day_select2
        await this.click_element(day_select)
        if(gender == "male"){
            await this.click_element(locator.radio_btn_male)
        }else if( gender == "female"){
            await this.click_element(locator.radio_btn_female)
        }else{
            await this.click_element(locator.radio_btn_o)
        }
        await this.click_element(locator.btn_sign_up);
        return this.page
    }
}
module.exports = {SignupPage}