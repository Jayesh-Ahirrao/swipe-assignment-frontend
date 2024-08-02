import { CATEGORIES } from "../constants/categories";
var validator = require("email-validator");

class ValidationResponse {
    constructor(message, passed = false) {
        this.passed = passed;
        this.message = message;
    }
}

export const validateProduct = (product) => {
    if (!product) return new ValidationResponse("Invalid product");

    if (!product.name || product.name.trim() === '') return new ValidationResponse("Enter a name of the product");

    if (!product.description || product.description.trim() === '') return new ValidationResponse("Enter a description of the product")

    else if (product.description.trim().length < 4) return new ValidationResponse("Please provide clear description of the product");

    if (!product.price || product.price < 0.1) return new ValidationResponse("Price of the product must be between greater than 0.1");

    return new ValidationResponse("Product added successfully", true);
}

/**
 * validation for single item
 * @returns 
 */
export const validateItem = (item) => {
    if (!item) return new ValidationResponse("Invalid item");

    if (item.itemName.length < 3) return new ValidationResponse("Provide valid name for an Product");

    if (!item.itemDescription || item.itemDescription.length < 3) return new ValidationResponse("Provide valid description for an Product");

    if (item.itemPrice < 0.1) return new ValidationResponse("Provide a price for an Product greater than 0.1");

    if (item.itemQuantity < 1) return new ValidationResponse("Provide quantity for Product");

    if (![CATEGORIES.GOODS, CATEGORIES.SERVICES].includes(item.category)) return new ValidationResponse("Select a category of  Product");

    return new ValidationResponse("Successfull", true);
}


export const validateInvoice = (invoice, invoiceList = []) => {
    if (!invoice) return new ValidationResponse("This invoice number is already in use");

    // unique invoice number
    // && codition to neglect own record in list
    const isIdNotUnique = invoiceList.find((record) => (record.invoiceNumber === invoice.invoiceNumber && record.id !== invoice.id));
    if (isIdNotUnique) return new ValidationResponse("This invoice number is already in use");

    // dateOfIssue
    if (!invoice.dateOfIssue) return new ValidationResponse("Select a Due date");

    // addresses and emails
    if (!invoice.billTo || !invoice.billTo.trim()) return new ValidationResponse( "Enter clients name");

    if (!invoice.billToEmail || !validator.validate(invoice.billToEmail)) return new ValidationResponse("Enter clients valid email address");

    if (!invoice.billToAddress || !invoice.billToAddress.trim()) return new ValidationResponse("Provide client address");

    // owner
    if (!invoice.billFrom || !invoice.billFrom.trim()) return new ValidationResponse("Enter providers name");

    if (!invoice.billFromEmail || !validator.validate(invoice.billFromEmail)) return new ValidationResponse("Enter providers valid email address");

    if (!invoice.billFromAddress || !invoice.billFromAddress.trim()) return new ValidationResponse("Provide providers address");

    // items
    if (!invoice.items || invoice.items.length === 0) return new ValidationResponse("Add Product to invoice");

    // to check individaul items
    let result;
    let isItemInvalid = invoice.items.some((item) => {
        result = validateItem(item);
        return !result.passed;
    });
    if (isItemInvalid) return result;

    // doing this because the tax ratecan be "" for value of '0.0' 
    if (invoice.taxRate && invoice.taxRate < 0) return new ValidationResponse("Invalid tax rate");

    if (invoice.discountRate && invoice.discountRate < 0) return new ValidationResponse("Invalid Discount rate");

    if (!invoice.currency) return new ValidationResponse("Select Valid currency");

    return new ValidationResponse("Invoice Created", true);
};