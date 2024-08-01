import { useCallback, useMemo, useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import CustomModal from './CustomModal';
import validateProduct from '../utils/validateProduct.js'
import showToast from '../utils/showToast.js';
import { TOASTVARIANTS } from '../constants/toastVariants.js';


const ProductCard = ({ product, onDelete, onEdit }) => {
    const [showModal, setShowModal] = useState(false);
    const [editedProduct, setEditedProduct] = useState({ ...product });


    const handleInputChnage = useCallback((event) => {
        const { name, value } = event.target;
        setEditedProduct((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleModalSave = useCallback((updatedProduct) => {
        const res = validateProduct(updatedProduct);

        if (!res.passed) {
            showToast(res.message);
            return;
        }

        showToast("Product saved", TOASTVARIANTS.success);
        onEdit(updatedProduct);
        setShowModal(false);
    }, [onEdit]);

    const handleEdit = useCallback(() => {
        setShowModal(true);
    }, []);

    const handleModalClose = useCallback(() => {
        setEditedProduct({ ...product }); //to reset edited fields
        setShowModal(false);
    }, [product]);



    const modalFooter = useMemo(() => {
        return (
            <div>
                <Button variant='secondary' onClick={handleModalClose} className='mx-2 py-2 rounded-5' >Close</Button>
                <Button variant='primary' onClick={() => handleModalSave(editedProduct)} className='py-2 px-3 rounded-5' >Save</Button>
            </div>
        )
    }, [editedProduct, handleModalClose, handleModalSave]);

    return (
        <>
            <Card style={{ width: '18rem' }} className="p-4 my-1">
                <Card.Title className='mb-3'>{product.name}</Card.Title>
                <Card.Text className='mb-1'>
                    {product.description}
                </Card.Text>
                <Card.Text style={{ fontWeight: 'bold', color: '#716E6F' }}>
                    Price: ${product.price}
                </Card.Text>
                <div className=' d-flex gap-1   align-items-center'>
                    <Button variant="primary" className='w-auto py-1 px-3 rounded-5' onClick={handleEdit}>Edit</Button>
                    <Button variant="danger" className='w-auto py-1 px-3 rounded-5' onClick={() => onDelete(product.id)}>Delete</Button>
                </div>
            </Card>


            <CustomModal
                show={showModal}
                onHide={handleModalClose}
                title="Edit Product"
                body={
                    <Form >
                        <Form.Group className='mb-3' >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' name='name' value={editedProduct.name} onChange={handleInputChnage} />
                        </Form.Group>
                        <Form.Group className='mb-3' >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as='textarea' rows={2} name='description' value={editedProduct.description} onChange={handleInputChnage} />
                        </Form.Group>
                        <Form.Group className='mb-3' >
                            <Form.Label>Price</Form.Label>
                            <Form.Control type='number' min="0.01" name='price' value={editedProduct.price} onChange={handleInputChnage} />
                        </Form.Group>
                    </Form >
                }
                footer={modalFooter}
            />
        </>
    )
}

export default ProductCard;