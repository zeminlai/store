import {createContext, useEffect, useState} from 'react';

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

    function sortedObject(unordered) {
        return Object.keys(unordered).sort().reduce(
          (obj, key) => {
            obj[key] = unordered[key];
            return obj;
          }, {});
      }

    function compareObj(cartCourt, court){
        return (JSON.stringify(sortedObject(cartCourt.court)) === JSON.stringify(sortedObject(court)))
    }

    function getProductQuantity(court){
        let quantity = 0;

        cartProducts.find(cartCourt => JSON.stringify(sortedObject(cartCourt.court)) === JSON.stringify(sortedObject(court)))
        ? quantity = 1
        : quantity = 0

        return quantity;
    }

    function addOneToCart(court){
        const quantity = getProductQuantity(court);
    
        if (quantity === 0){
            // product not yet in cart
            setCartProducts(
                [   //previous cart products still remain in cart
                    ...cartProducts,
                    {court}
                ]
            )
        }
        
    }

    useEffect(() => {
        console.log(cartProducts)
    }, [cartProducts])

    // DIY
    function deleteFromCart(court){
        const newProducts = cartProducts.filter(cartCourt => !(compareObj(cartCourt, court)))
        setCartProducts(newProducts)
    }

    // function removeOneToCart(court){
    //     const quantity = getProductQuantity(id);
    //     if (quantity === 1){
    //         deleteFromCart(id);
    //     }else {
    //         setCartProducts(
    //             cartProducts.map(
    //                 product =>
    //                 product.id === id
    //                 ? {...product, quantity: product.quantity - 1}
    //                 : product
    //             )
    //         )
    //     }
    // } 
    
    function getTotalCost(){
        let totalCost = 0;
        cartProducts.map(cartCourt => {
            totalCost += cartCourt.court.price 
        })
        return totalCost;
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
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