import {Button} from 'react-bootstrap'
const Success = () => {
    const redirectHome = () => {
        window.location.href= "http://localhost:8080/home"
    }
    return (  
        <>
            <h1 align="center">Payment Successful</h1>
            <h3 align="center">Thank you for purchasing!</h3>

            <Button onClick={redirectHome} variant='success' className='homepage-btn btn btn-primary mx-auto d-block m-5'>Back to home page</Button>        


        </>
    );
}
 
export default Success;