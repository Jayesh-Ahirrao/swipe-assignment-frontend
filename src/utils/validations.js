import { CATEGORIES } from "../constants/categories";
var validator = require("email-validator");

export const validateProduct = (product) => {
    const res = {
        passed: false,
        message: "",
    }

    if (!product) {
        res.message = "Invalid product";
        return res;
    }

    if (!product.name || product.name.trim() === '') {
        res.message = "Please Enter a name of the product";
        return res;
    }

    if (!product.description || product.description.trim() === '') {
        res.message = "Please Enter a name of the product";
        return res;
    } else if (product.description.trim().length < 4) {
        res.message = "Please provide clear description of the product";
        return res;
    }

    if (!product.price || product.price < 0.1) {
        res.message = "Price of the product must be between greater than 0.1";
        return res;
    }

    res.passed = true;
    return res;
}


// const item = {
//     itemId: id,
//     itemName: "",
//     itemDescription: "",
//     itemPrice: "1.00",
//     itemQuantity: 1,
//     category: "",
// };


/**
 * validation for single item
 * @returns 
 */
export const validateItem = (item) => {
    const res = {
        passed: false,
        message: "",
    }


    if (!item) {
        res.message = "Invalid Product";
        return res;
    }

    if (item.itemName.length < 3) {
        res.message = "Provide valid name for an Product";
        return res;
    }

    if (!item.itemDescription || item.itemDescription.length < 3) {
        res.message = "Provide valid description for an Product";
        return res;
    };

    if (item.itemPrice < 0.1) {
        res.message = "Provide a price for an Product greater than 0.1";
        return res;
    }
    if (item.itemQuantity < 1) {
        res.message = "Provide quantity for Product";
        return res;
    }

    if (![CATEGORIES.GOODS ,CATEGORIES.SERVICES].includes(item.category) ) {
        res.message = "Select a category of  Product";
        return res;
    }

    res.passed = true;
    return res;
}


export const validateInvoice = ( invoice , invoiceList =[]) => {
    const res = {
        passed: false,
        message: "",
    }

    if(!invoice) {
        res.message = "Invalid invoice";
        return res;
    }
    // unique invoice number
    const isIdNotUnique = invoiceList.find((record) => record.invoiceNumber === invoice.invoiceNumber )

    if(isIdNotUnique) {
        res.message = "This invoice number is already in use";
        return res;
    }

    // dateOfIssue
    if(!invoice.dateOfIssue) {
        res.message = "Select a Due date";
        return res;
    }

    // addresses and emails
    if(!invoice.billTo || !invoice.billTo.trim()) {
        res.message = "Enter clients name";
        return res;
    }

    if(!invoice.billToEmail || !validator.validate(invoice.billToEmail) ) {
        res.message = "Enter clients valid email address";
        return res;
    }

    if(!invoice.billToAddress || !invoice.billToAddress.trim() ) {
        res.message = "Provide client address";
        return res;
    }

    // owner
    if(!invoice.billFrom || !invoice.billFrom.trim()) {
        res.message = "Enter providers name";
        return res;
    }

    if(!invoice.billFromEmail || !validator.validate(invoice.billFromEmail) ) {
        res.message = "Enter providers valid email address";
        return res;
    }

    if(!invoice.billFromAddress || !invoice.billFromAddress.trim() ) {
        res.message = "Provide providers address";
        return res;
    }

    // items
    if(!invoice.items || invoice.items.length === 0 ){
        res.message = "Add Product to invoice";
        return res;
    }

    let result;

    let isItemInvalid = invoice.items.some((item) => {
        result = validateItem(item);
        return !result.passed;
    });

    if(isItemInvalid) return result; 

    // prices subtotal tax discount rate amount
    // doing this because the tax ratecan be "" for value of '0.0' 
    if(invoice.taxRate && invoice.taxRate < 0 ) {
        res.message = "Invalid tax rate";
        return res;
    }

    if(invoice.discountRate && invoice.discountRate < 0 ) {
        res.message = "Invalid Discount rate";
        return res;
    }

    if(invoice.subTotal < 0.1) {
        res.message = "Total cannot be negative";
        return res;
    }

    // currency
    if(!invoice.currency) {
        res.message = "Select Valid currency";
        return res;
    }   

    res.passed = true;
    return res; 
};


