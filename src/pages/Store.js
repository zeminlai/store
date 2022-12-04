import {Row, Col} from 'react-bootstrap'
import { productsArray } from '../productStore';
import ProductCard from '../components/ProductCard';

const Store = () => {
    return ( 
        <>
            <h1 align="center" className="p-3">Welcome to store</h1>
            <Row className='g-3'>
                {productsArray.map((product, index) => (
                    <div key={index}>
                        <ProductCard product={product} />
                    </div>
                ))}

            </Row>
        </>
     );
}
 
export default Store;