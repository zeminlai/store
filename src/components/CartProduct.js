import Button from 'react-bootstrap/Button';
import { CartContext } from '../CartContext';
import { useContext } from 'react';

const CartProduct = (props) => {
    const cart = useContext(CartContext)
    const court = props.currentProduct.court
    console.log(court)
    const quantity = props.quantity
    console.log(quantity)

    return ( 
        <div className=''>
            <div>
                <h3>Court {court.court}</h3>
                <p className='m-0'>Venue: {court.venue}</p>
                <p className='m-0'>Date: {court.date}</p>
                <p className='m-0'>Time: {court.timestart}:00 - {court.timestart + 1}:00 </p>
                <p className='m-0 mb-3'>RM {court.price}</p>
            </div>
            <div>
                <Button className="btn-danger"size='sm' onClick={() => cart.deleteFromCart(court)}>Remove</Button>
            </div>
            
            <hr></hr>
        </div>
     );
}
 
export default CartProduct;