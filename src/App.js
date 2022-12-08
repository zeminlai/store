
import 'bootstrap/dist/css/bootstrap.min.css'
import NavbarComponent from './components/Navbar';
import { Container } from 'react-bootstrap'
import { HashRouter, Routes, Route, useParams} from 'react-router-dom'
import Cancel from './pages/Cancel';
import Store from './pages/Store';
import Success from './pages/Success';
import CartProvider from './CartContext';
import Home from './pages/Home'

function App() {

  const {id} = useParams()
  return (
    <CartProvider>
    <Container>
      <NavbarComponent></NavbarComponent>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="booking" element={<Store />} />
          <Route path="success" element={<Success />} />
          <Route path="cancel" element={<Cancel />} />
          </Routes>         
      </HashRouter>
    </Container>
    </CartProvider>
  );
}

export default App;
