import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';


const ProductCard = ({ product }) => {
    return (
        <Card style={{ width: '18rem' }} className="p-4 my-1">
            <Card.Title className='mb-3'>{product.name}</Card.Title>
            <Card.Text className='mb-1'>
                {product.description}
            </Card.Text>
            <Card.Text  style={{ fontWeight: 'bold', color: '#716E6F' }}>
                Price: ${product.price}
            </Card.Text>
            <div className=' d-flex gap-1   align-items-center'>
                <Button variant="primary" className='w-auto px-2 py-1'>Edit</Button>
                <Button variant="danger" className='w-auto px-2 py-1'>Delete</Button>
            </div>
        </Card>
    )
}

export default ProductCard;