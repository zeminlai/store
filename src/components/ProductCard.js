import {Card, Button, Form, Row, Col} from 'react-bootstrap'
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const ProductCard = (props) => {
    const product = props.product;
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(product.id)
    console.log(cart.items)
    return ( 
        <Card>
            <Card.Body className="col">
             

                <Card.Title>{product.title}</Card.Title>
                <Card.Text>RM{product.price}</Card.Text>
           
                {productQuantity > 0 
                    ? <>
                    <Button  variant="danger" onClick={() => cart.deleteFromCart(product.id)}>Remove from cart</Button>
                    </>
                
                    :<Button variant="primary" onClick={() => cart.addOneToCart(product.id)}>Add to cart</Button>
                }
            </Card.Body>
        </Card>
     );
}
 
export default ProductCard;