const validateProduct = (product) => {
    const res = {
        passed: false,
        message: "",
    }
    if(!product.name || product.name.trim() === '') {
        res.message = "Please Enter a name of the product";
        return res;
    }
    
    if(!product.description || product.description.trim() === '') {
        res.message = "Please Enter a name of the product";
        return res;
    }else if(product.description.trim().length < 4) {
        res.message = "Please provide clear description of the product";
        return res;
    }

    if(!product.price || product.price < 0.1 ) {
        res.message = "Price of the product must be between greater than 0.1";
        return res;
    }

    res.passed = true;
    return res;
}

export default validateProduct;



export const validateItem = (item) => {
    
}