import {Button, Container, Navbar, Modal, ModalBody} from 'react-bootstrap'
import {useState, useContext} from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

const NavbarComponent = () => {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const handleShow = () => {setShow(true)};
    const handleClose = () => {setShow(false)}

    const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

    const handleCheckout = async() => {
        await fetch("http://localhost:4000/create-checkout-session", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({items: cart.items})
        }).then(response => {
            return response.json()
        }).then(({url}) => {
            window.location = url;
        })
    }

    return ( 
        <>
        <Navbar expands="sm">
            <Navbar.Brand href="/">Playlah</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>
                <Button onClick={handleShow}>Cart ({productsCount} items)</Button>
            </Navbar.Collapse>
        </Navbar>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Shopping Cart </Modal.Title>
            </Modal.Header>
            <ModalBody>
                {productsCount > 0 
                ?   
                <>
                    {console.log(cart.items)}
                    {cart.items.map((currentProduct, idx) => (
                        <CartProduct id={currentProduct.id} quantity={currentProduct.quantity}/>
                    ))}
                    <h3>Total: RM{cart.getTotalCost()}</h3>
                    <Button onClick={handleCheckout}>Checkout</Button>
                </>
                : <h3>There are no items yet...</h3>
                }
            </ModalBody>
        </Modal>
        </>
)}
 
export default NavbarComponent;