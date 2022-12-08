import {Button} from 'react-bootstrap'
const Success = () => {
    return (  
        <>
            <h1 align="center">Payment Successful</h1>
            <h3 align="center">Thank you for purchasing!</h3>

            <Button variant='success' className='homepage-btn btn btn-primary mx-auto d-block m-5'><a href="/home">Back to home page</a></Button>        


        </>
    );
}
 
export default Success;