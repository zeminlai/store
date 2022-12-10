import {Button, Container, Navbar, Modal, ModalBody, Dropdown} from 'react-bootstrap'
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
        await fetch("/create-checkout-session", {
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
        fetch('/check')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setTokenId(data.id)
            })
    },[])

    let menuToggle = document.querySelector('.menuToggle')
    let body = document.querySelector('body')
    let navigation = document.querySelector('.navigation')
    function handleToggle(){
        menuToggle.classList.toggle('active')
        navigation.classList.toggle('active')
      }

    return ( 
        <div className="navbar-lol">

        <Navbar expands="sm">
            <Navbar.Brand href="/home">C R O C</Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className='justify-content-end'>


                {tokenId
                ? 
                <Button className='m-4 btn btn-danger' href="/logout">Log Out</Button>
                :
                <Button className="m-4 btn btn-info " href="/login">Login</Button>
                }


                <Button onClick={handleShow}>Cart ({productsCount} items)</Button>

                <Dropdown className='m-3'>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Menu
                    </Dropdown.Toggle>

                    <Dropdown.Menu >
                        <Dropdown.Item href="/home">Home</Dropdown.Item>
                        <Dropdown.Item href="/booking">Booking</Dropdown.Item>
                        <Dropdown.Item href="/discover">Discover</Dropdown.Item>
                        <Dropdown.Item href="/dashboard">Upcoming</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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