import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { getAllProducts, setSelectedProduct } from '../redux/slices/productSlice';
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import Button from '@mui/material/Button';
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';
import '../css/ProductDetails.css';

function ProductDetails() {

    const dispatch = useDispatch();

    const { id } = useParams();
    const { products, selectedProduct } = useSelector((store) => store.product)
    const { price, image, title, description } = selectedProduct;

    const [count, setCount] = useState(1);

    const increment = () => {
        setCount(count + 1)
    }

    const decrement = () => {
        if (count == 1) {
            return;
        }
        setCount(count - 1)
    }

    const addBasket = () => {
        const payload = {
            id,
            price,
            image,
            title,
            description,
            count,
        }

        dispatch(addToBasket(payload))
        dispatch(calculateBasket());
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
    }


    useEffect(() => {
        dispatch(getAllProducts());
        getProductById();
    }, [])

    const getProductById = () => {
        products && products.map((product) => {
            if (product.id == id) {
                dispatch(setSelectedProduct(product));
            }
        })
    }

    return (
        <div className='mt-36 flex flex-row justify-center'>
            <div className='mr-14'>
                <img className='w-[600px] h-[400px]' src={image} alt="selected-product-img" />
            </div>
            <div>
                <h2 className='font-bold font-sans text-4xl mt-3'>{title}</h2>
                <h3 className='font-thin font-sans text-lg mt-3'>{description}</h3>
                <div className='flex flex-row justify-start items-center text-center mt-3'>
                    <CiCirclePlus onClick={increment} className='size-[35px]' /><span className='size-[35px] text-2xl'>{count}</span><CiCircleMinus onClick={decrement} className='size-[35px]' />
                </div>
                <h1 className='font-bold font-sans text-3xl mt-3 mb-3'>{price}₺</h1>
                <div onClick={addBasket} className='popup'>
                    <Button size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Sepete Ekle</Button>
                    <span id='myPopup' className='popuptext'>Ürün Sepete Başarıyla Eklendi</span>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails