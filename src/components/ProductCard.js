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
        <Card className="productCard">
            <Card.Body className='d-flex justify-content-between align-items-center'>
                        <div className=''>

                            <Card.Title className='m-1'>Court {court.court}</Card.Title>
                            <Card.Text className='m-1'>{court.venue} | {court.date} | {court.timestart}:00</Card.Text>
                            <Card.Text className='m-1'>{court.sport}</Card.Text>
                            <Card.Text className='m-1'>RM{court.price}</Card.Text>
                        </div>
                        <div className=''>

                        {productQuantity > 0 
                            ? <>
                            <Button  variant="danger" onClick={() => cart.deleteFromCart(court)}>Remove from cart</Button>
                            </>
                        
                            :<Button variant="primary" onClick={() => cart.addOneToCart(court)}>Add to cart</Button>
                        }
                        </div>
                    
            </Card.Body>
        </Card>
     );
}
 
export default ProductCard;