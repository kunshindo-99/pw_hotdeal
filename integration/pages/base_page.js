

class BasePage{
    constructor(page){
        this.page = page
    }
    //action
    async click_element(element_locator){
        await this.page.click(element_locator)
    }

    async choose_from_dropdown(element_locator,option_value){
        await this.page.waitForSelector(element_locator)
        await this.page.click(element_locator)
        await this.page.selectOption(element_locator,option_value)
    }

    async input_text_to_element(element_locator,text){
        await this.page.fill(element_locator,text)
    }

    async hover_element(element_locator){
        await this.page.hover(element_locator)
    }

    //get_data
    async get_data_from_element(element_locator){
        var data = await this.page.innerText(element_locator)
        return data
    }

    async get_list_element(element_locator){
        await this.page.waitForSelector(element_locator,'detached');
        var rec = await this.page.$$(element_locator)
        // await console.log(rec.length)
        // for(var i=0; i<rec.length; i++){
        //     let data = await rec[i].innerText()
        //     await console.log(data)
        // }
        return rec
    }

    //verify
    async verify_element_have_attribute(element_locator,name,value){
        var value_rec = await this.page.getAttribute(element_locator,name)
        // await console.log(value_rec)
        await expect(value_rec).toEqual(value)
    }

    async verify_element_innerText(element_locator,text){
        var rec = await this.page.innerText(element_locator)
        // console.log(rec)
        await expect(rec).toEqual(text)
    }

    async verify_element_innerHTML(element_locator,text){
        var rec = await this.page.innerHTML(element_locator)
        // await console.log(rec)
        await expect(rec).toEqual(text)
    }

    async verify_list_element_contain_text(element_locator,text){
        var firstResult = await this.page.waitForSelector(element_locator);
        var rec = await this.page.$$(element_locator)
        // await console.log(rec.length)
        for(var i=0; i<rec.length; i++){
            let a = await rec[i].innerHTML()
            // await console.log(a.toLowerCase())
            await expect(a.toLowerCase()).toContain(text)
        }
    }

    async verify_element_innerHTML_contain_text(element_locator,text){
        var rec = await this.page.innerHTML(element_locator)
        // await console.log(rec)
        await expect(rec.toLowerCase()).toContain(text)
    }

    async verify_list_element_contain_in_list(element_locator_first_sug,element_locator_sug,element_locator_c){
        await this.page.waitForSelector(element_locator_c);
        await this.page.waitForSelector(element_locator_sug);
        var rec_c = await this.page.$$(element_locator_c)
        var rec_sug = await this.page.$$(element_locator_sug)
        // await console.log(rec_c.length)
        // await console.log(rec_sug.length)
        var total_search_data="";
        for(var i=0; i<rec_c.length; i++){
            let search_data = await rec_c[i].innerHTML()
            total_search_data = total_search_data + search_data.toLowerCase();
        }
        // console.log(total_search_data.toLocaleLowerCase())
        var first_suggest = await this.page.innerText(element_locator_first_sug) 
        // console.log(first_suggest.toLocaleLowerCase())
        await expect(total_search_data).toContain(first_suggest.toLowerCase())
        for(var j=0; j<rec_sug.length; j++){
            let suggest_data = await rec_sug[j].innerText()
            // await console.log(suggest_data.toLowerCase())
            // await console.log(suggest_data.toLowerCase())
            await expect(total_search_data).toContain(suggest_data.toLowerCase())
        }
    }
    async verify_maping_list_element_and_array(element_locator ,array, key){
        await this.page.waitForSelector(element_locator);
        var rec_data = await this.page.$$(element_locator)
        // await console.log(rec_data.length)
        for(var i=0; i<rec_data.length; i++){
            let elemen_text= await rec_data[i].innerText()
            if(key == "product_name"){
                elemen_text= elemen_text.toLowerCase().slice(0,(elemen_text.search("Mã SP")-1));
            }else if(key == "price_per_product" || key == "total_price"){
                elemen_text= elemen_text.toLowerCase().replace(/,/g,'').slice(0,-2)
            }
            // await console.log(elemen_text)
            // await console.log(array[i][key].length)
            await expect(elemen_text).toEqual(array[i][key])
        }
    }

    async verify_element_currency_text(element_locator,text){
        var data = await this.page.innerText(element_locator)
        data = data.toLowerCase().replace(/,/g,'').slice(0,-2)
        await expect(data).toEqual(text)
    }

    async verify_list_element_have_count(element_locator,number){
        await this.page.waitForSelector(element_locator);
        var rec_data = await this.page.$$(element_locator)
        await expect(rec_data.length.toString()).toEqual(number)
    }

    async verify_list_sort_des(array){
        var previous_data = parseFloat( array[0] )
        for( var i=1; i<array.length; i++){
            await expect(previous_data).toBeLessThanOrEqual(parseFloat(array[i]))
            previous_data = parseFloat(array[i])
        }
    }
}
module.exports = {BasePage}