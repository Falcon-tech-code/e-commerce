import React from 'react'
import { calculateBasket, deleteFromBasket } from '../redux/slices/basketSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';

function Checkout() {

    const { products, totalAmount } = useSelector((store) => store.basket);

    const dispatch = useDispatch();

    const handleRemoveFromBasket = (product) => {
        dispatch(deleteFromBasket(product));
        dispatch(calculateBasket());
    }


    useEffect(() => {
        dispatch(calculateBasket());
    }, [])

    return (
        <div>
            <div>
                {
                    products && products.map((product) => {
                        return (
                            <div key={product.id}>
                                <div className='flex flex-row items-center justify-center text-center p-[20px]'>
                                    <img className='w-[50px] h-[50px] mr-3' src={product.image} alt="product-basket-img" />
                                    <p className='w-[320px] mr-3'>{product.title}({product.count})</p>
                                    <p className='font-bold mr-3 w-[60px]'>{product.price}₺</p>
                                    <Button onClick={() => handleRemoveFromBasket(product)} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Sil</Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <p className='text-center'>Toplam Tutar: {totalAmount.toFixed(2)}₺</p>
            </div>
        </div>
    )
}

export default Checkout