import { CATEGORIES } from "../constants/categories";

export const getUpdatedPricedForInvoice = (product, { taxRate, discountRate }) => {
    console.log("in", product);
    console.log("init", taxRate);

    let subTotal = 0;
    let goodsTotal = 0;
    let serviceTotal = 0;


    let currCost = parseFloat(product.itemPrice).toFixed(2) * parseInt(product.itemQuantity);

    if (product.category === CATEGORIES.GOODS) {
        goodsTotal += currCost;
    } else {
        serviceTotal += currCost;
    }
    subTotal += currCost;
    const taxAmount = parseFloat(subTotal * (taxRate / 100)).toFixed(2);
    const discountAmount = parseFloat(subTotal * (discountRate / 100)).toFixed(2);

    const total = (subTotal - parseFloat(discountAmount) + parseFloat(taxAmount)).toFixed(2);

    return {
        subTotal,
        total,
        serviceTotal,
        goodsTotal,
    }
}