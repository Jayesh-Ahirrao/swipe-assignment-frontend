import React from 'react'
import GoToButton from '../UI/GoToButton';
import { useProductListData } from '../redux/hooks';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const ProductsDetails = () => {
    const { productsList } = useProductListData();

    return (
        <div className='productsPage w-100'>
            <GoToButton url={"/"} />
            <div className=' d-flex flex-wrap gap-4 my-5'>
                {productsList.length > 0 && productsList.map((product, index) => {
                    return (
                        <Card style={{ width: '18rem' }} className="p-4 my-1">
                            <Card.Title>Special title treatment</Card.Title>

                            <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                            </Card.Text>
                            <div className=' d-flex gap-1   align-items-center'>
                                <Button variant="primary" className='w-auto px-2 py-1'>Edit</Button>
                                <Button variant="danger" className='w-auto px-2 py-1'>Delete</Button>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductsDetails;