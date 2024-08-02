import { useCallback, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import React from "react";




const ProductModal = ({ show, title, product, onClose, onSave, isCreateModal = false }) => {
    const options = ['goods', 'services'];
    console.log("ProductModal redered================================");
    const formRef = useRef({ ...product });

    const handleInputChnage = useCallback((event) => {
        const { name, value } = event.target;
        formRef.current = { ...formRef.current, [name]: value };
    }, [formRef]);

    useEffect(() => {
        formRef.current = { ...product };
    }, [product]);

    useEffect(() => {
        // to erase the form after adding new product
        formRef.current = {};   
    }, [show]);

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton >
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form >
                    <Form.Group className='mb-3' >
                        <Form.Label>Name</Form.Label>
                        <Form.Control type='text' name='name' defaultValue={formRef.current.name} onChange={handleInputChnage} />
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as='textarea' rows={2} name='description' defaultValue={formRef.current.description} onChange={handleInputChnage} />
                    </Form.Group>
                    <Form.Group className='mb-3' >
                        <Form.Label>Price</Form.Label>
                        <Form.Control type='number' min="0.01" name='price' defaultValue={formRef.current.price} onChange={handleInputChnage} />
                    </Form.Group>

                    {isCreateModal && (
                        <Form.Group className='mb-3'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                as="select"
                                name='category'
                                defaultValue={formRef.current.category || ''}
                                onChange={handleInputChnage}
                            >
                                <option value='' disabled>Select a category</option>
                                {options.map(op => (
                                    <option key={op} value={op}>
                                        {op}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    )}


                </Form >
            </Modal.Body>
            <Modal.Footer>
                <div>
                    <Button variant='secondary' onClick={onClose} className='mx-2 py-2 rounded-5' >Close</Button>
                    <Button variant='primary' onClick={() => onSave(formRef.current)} className='py-2 px-3 rounded-5' >Save</Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(ProductModal);