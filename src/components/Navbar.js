import {Button, Container, Navbar, Modal, ModalBody} from 'react-bootstrap'
import {useState, useContext, useEffect} from 'react';
import { CartContext } from '../CartContext';
import CartProduct from './CartProduct';

const NavbarComponent = () => {
    const cart = useContext(CartContext);

    const [show, setShow] = useState(false);
    const [tokenId, setTokenId] = useState('')
    const handleShow = () => {setShow(true)};
    const handleClose = () => {setShow(false)}

    const productsCount = cart.items.length;
    // const productsCount = cart.items.reduce((sum, product) => sum + product.quantity, 0)

    const handleCheckout = async() => {
        await fetch("http://localhost:8080/create-checkout-session", {
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

    useEffect(() => {
        fetch('http://localhost:8080/check')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTokenId(data.id)
            })
    },[])

    return ( 
        <div className="navbar-lol">
        <Navbar expands="sm">
            <Navbar.Brand href="/">C R O C</Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>


                {tokenId
                ? 
                <Button className='m-4 btn btn-success' href="http://localhost:8080/dashboard">Dashboard</Button>
                :
                <Button className="m-4 btn btn-info " href="http://localhost:8080/login">Login</Button>
                }


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
                        <CartProduct key={idx} quantity={1} currentProduct={currentProduct}/>
                    ))}
                    <h3>Total: RM{cart.getTotalCost()}</h3>
                    <Button onClick={handleCheckout}>Checkout</Button>
                </>
                : <p>There are no items yet...</p>
                }
            </ModalBody>
        </Modal>
        </div>
)}
 
export default NavbarComponent;