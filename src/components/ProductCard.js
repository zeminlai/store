import {Card, Button, Form, Row, Col} from 'react-bootstrap'
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const ProductCard = (props) => {
    const courtInfo = props.court.searchCourt;
    const courtNum = props.court.courtNum
    const court = {
        court: courtNum,
        venue: courtInfo.venue,
        price: props.price,
        timestart: courtInfo.timestart,
        date: courtInfo.date,
        sport: courtInfo.sport,
        quantity: 0
    }
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(court)
    return ( 
        <Card>
            <Card.Body className="col">
             

                <Card.Title>Court {court.court}</Card.Title>
                <Card.Text>{court.venue}</Card.Text>
                <Card.Text>RM{court.price}</Card.Text>

                {productQuantity > 0 
                    ? <>
                    <Button  variant="danger" onClick={() => cart.deleteFromCart(court)}>Remove from cart</Button>
                    </>
                
                    :<Button variant="primary" onClick={() => cart.addOneToCart(court)}>Add to cart</Button>
                }
            </Card.Body>
        </Card>
     );
}
 
export default ProductCard;