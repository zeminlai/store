import {createContext, useState} from 'react';
import { productsArray, getProductData } from './productStore';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneToCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
})

export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);

    function getProductQuantity(id){
        const quantity = cartProducts.find(product => product.id === id)?.quantity
        if (quantity === undefined) return 0;
        return quantity;
    }

    function addOneToCart(id){
        const quantity = getProductQuantity(id);
        const product = getProductData(id)
        if (quantity === 0){
            // product not yet in cart
            setCartProducts(
                [   //previous cart products still remain in cart
                    ...cartProducts,
                    {
                        // add the new item
                        id:id,
                        quantity: 1,
                        title: product.title,
                        price: product.price
                    }
                ]
            )
        }else {
            // product already in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? {...product, quantity: product.quantity + 1}
                    : product
                )
            )
        }
    }

    // DIY
    function deleteFromCart(id){
        const newProducts = cartProducts.filter(product => product.id !== id)
        setCartProducts(newProducts)
    }

    function removeOneToCart(id){
        const quantity = getProductQuantity(id);
        if (quantity === 1){
            deleteFromCart(id);
        }else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? {...product, quantity: product.quantity - 1}
                    : product
                )
            )
        }
    } 
    
    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map(cartItem => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        })
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneToCart,
        deleteFromCart,
        getTotalCost
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;