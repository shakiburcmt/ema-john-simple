import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const [products, setProducts] = useState([]);
    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    // this part is now unnecessary because of using react router loader
    // useEffect( () =>{
    //     fetch('products.json')
    //     .then(res=> res.json())
    //     .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        // console.log(storedCart)
        // jehetu property tai for in loop
        for (const id in storedCart) {
            // console.log(id)
            // find korle full object kei diye dibe tai id diye find korar por oi id selected thake oi id er full object pawa jabe
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                // console.log(quantity)
                addedProduct.quantity = quantity;
                // console.log('selected products',addedProduct)
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
        // nocher line e products dependency injection hisabe kaj kore mane jotobar change hobe totobar call korbe products ke,, empty array hole ekbar e call korbe
    },[products])

    const handleAddToCart = (selectedProduct) =>{
        console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product.id === selectedProduct.id);
        if (!exists) {
            selectedProduct.quantity = 1;
            // do not do this: cart.push(product);
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct.id)
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product=><Product 
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;