import Button from 'react-bootstrap/Button';
import { CartContext } from '../CartContext';
import { useContext } from 'react';
import { getProductData } from '../productStore';

const CartProduct = (props) => {
    const cart = useContext(CartContext)
    const court = props.currentProduct.court
    console.log(court)
    const quantity = props.quantity
    console.log(quantity)

    return ( 
        <>
            <h3>Court {court.court}</h3>
            <p>Venue: {court.venue}</p>
            <p></p>
            <p>RM {court.price}</p>
            <Button className="btn-danger"size='sm' onClick={() => cart.deleteFromCart(court)}>Remove</Button>
            <hr></hr>
        </>
     );
}
 
export default CartProduct;