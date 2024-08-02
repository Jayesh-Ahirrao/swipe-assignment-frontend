import React, { useCallback } from 'react'
import GoToButton from '../UI/GoToButton';
import { useProductListData } from '../redux/hooks';
import ProductCard from '../components/ProductCard';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct } from '../redux/productsSlice';
import { Button } from 'react-bootstrap';

// TODO: if you have time add a create product option next to goto btn
const ProductsDetails = () => {
    const { productsList } = useProductListData();
    const dispatch = useDispatch(); //stable ==> doesn't change between renders

    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id));
    }, [dispatch]);

    const handleEdit = useCallback((product) => {
        dispatch(updateProduct(product));
    }, [dispatch]);

    return (
        <div className='productsPage w-100'>
            <div  className="d-flex align-items-center">
                <GoToButton url={"/"} text={'Go Back'} />
                <Button className='my-2' >Add Product</Button>
            </div>


            <div className=' d-flex flex-wrap gap-4 my-5'>
                {productsList.length > 0 && productsList.map((product, index) => {
                    return (
                        <ProductCard product={product} key={product.id} onDelete={handleDelete} onEdit={handleEdit} />
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsDetails;