import React, { useCallback, useState } from 'react'
import GoToButton from '../UI/GoToButton';
import { useProductListData } from '../redux/hooks';
import ProductCard from '../components/ProductCard';
import { useDispatch } from 'react-redux';
import { deleteProduct, updateProduct, addProduct } from '../redux/productsSlice';
import { Button } from 'react-bootstrap';
import ProductModal from '../components/ProductModal';
import { validateProduct } from '../utils/validations.js'
import showToast from '../utils/showToast.js';
import { TOASTVARIANTS } from '../constants/toastVariants.js';
import { v4 } from 'uuid'; // Import uuid package


// TODO: if you have time add a create product option next to goto btn
const ProductsDetails = () => {
    const [showModal, setShowModal] = useState(false);

    const { productsList } = useProductListData();
    const dispatch = useDispatch(); //stable ==> doesn't change between renders


    const handleDelete = useCallback((id) => {
        dispatch(deleteProduct(id));
    }, [dispatch]);

    const handleEdit = useCallback((product) => {
        dispatch(updateProduct(product));
    }, [dispatch]);

    const handleModalSave = useCallback((product) => {
        const res = validateProduct(product);

        if (!res.passed) {
            showToast(res.message);
            return;
        }
        // TODO: check this
        const finalProd = { ...product, id: v4() }

        dispatch(addProduct(product));
        showToast("Product saved", TOASTVARIANTS.success);
        handleModalClose();
    }, []);

    const handleAddProduct = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setShowModal(false);
    }, []);

    return (
        <div className='productsPage w-100'>
            <div className="d-flex align-items-center">
                <GoToButton url={"/"} text={'Go Back'} />
                <Button className='my-2' onClick={handleAddProduct} >Add Product</Button>
            </div>


            <div className=' d-flex flex-wrap gap-4 my-5'>
                {productsList.length > 0 && productsList.map((product, index) => {
                    return (
                        <ProductCard product={product} key={product.id} onDelete={handleDelete} onEdit={handleEdit} />
                    )
                })}
            </div>


            <ProductModal show={showModal} title="Enter product details" onClose={handleModalClose} onSave={handleModalSave} isCreateModal={true} />
        </div>
    )
}

export default ProductsDetails;