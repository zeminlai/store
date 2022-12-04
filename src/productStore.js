const productsArray = [
    {
        id: '1',
        title: 'court 1',
        price: 10
    },
    {
        id: '2',
        title: 'court 5',
        price: 12
    },
    {
        id: '3',
        title: 'court 10',
        price: 15
    },
]

const getProductData = (id) => {
    let productData = productsArray.find(product => product.id == id)
    
    if (productData == undefined){
        console.log("Product data does not exist for id: " + id)
        return undefined
    }

    return productData;
}

export {productsArray, getProductData}