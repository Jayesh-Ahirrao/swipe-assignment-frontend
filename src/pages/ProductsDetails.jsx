import React from 'react'
import GoToButton from '../UI/GoToButton';
import { useProductListData } from '../redux/hooks';

const ProductsDetails = () => {
    const { productsList } = useProductListData();

    return (
        <div className='productsPage'>
            <GoToButton url={"/"} />
            {productsList &&  productsList.length > 0 && productsList.map((product, index) => <h1 className='' key={index} >{ product.name} </h1>)}
        </div>
    )
}

export default ProductsDetails;