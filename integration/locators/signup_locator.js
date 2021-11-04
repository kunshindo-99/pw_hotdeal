class locator{
    //input field
    static input_email = "#email"
    static password_input = "div[class='input-group'] > input[data-fv-stringlength-min='6']";
    static confirm_password_input = "input.form-control[name='password2']";
    //date-picker
    static birthday_picker = "input.form-control[name='birthday']";
    static month_dropdown = "div[style='display: block;'] .monthselect";
    static year_dropdown = "div[style='display: block;'] .yearselect";
    static day_select1 = "xpath=//td[text()='"
    static day_select2 = "' and  not(contains(@class,'off')) ]";
    //gender
    static radio_btn_male = "#gender_m";
    static radio_btn_female = "#gender_f";
    static radio_btn_o = "#gender_o";
    //
    static btn_sign_up = "div[class='form__inner'] div[class='form-group form-group-lg'] > button";
    //email_error_mess
    static err_email_icon = "i[class='form-control-feedback fv-bootstrap-icon-input-group glyphicon glyphicon-remove']"
    static err_email_type = "div[class='form-group form-group-lg has-feedback has-error fv-has-tooltip'] > small[data-fv-validator='regexp']";
    static err_email_text = "div[class='popover-content']";
}
module.exports = {locator}