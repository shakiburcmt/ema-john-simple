import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products
    const productsData = await fetch('http://localhost:4000/products');
    const {products} = await productsData.json();

    // get cart
    const savedCart = getStoredCart();
    console.log(savedCart);
    const initialCart = [];
    console.log(products)
    for (const id in savedCart) {
        console.log(id);
        const addedProduct = products.find(product => product._id === id);
        // console.log(id, addedProduct)
        if (addedProduct) {
            const quantity = savedCart[id];
            // console.log(id,quantity)
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }

    }


    return { products, initialCart };
}