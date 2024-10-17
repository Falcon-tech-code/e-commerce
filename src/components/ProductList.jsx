import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, changeProductCategory } from '../redux/slices/productSlice';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

function PorductList() {

    const navigate = useNavigate();

    const handleFilter = (category) => {
        dispatch(changeProductCategory(category));
    }

    const dispatch = useDispatch();
    const { products, category } = useSelector((store) => store.product);

    useEffect(() => {
        dispatch(getAllProducts())
        dispatch(changeProductCategory("all"));
    }, [])

    return (
        <div>
            <div>
                <div className='flex flex-row justify-center items-center text-center gap-5 mt-5'>
                    <Button onClick={() => handleFilter("all")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Tüm Ürünler</Button>
                    <Button onClick={() => handleFilter("men's clothing")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Erkek Giyim</Button>
                    <Button onClick={() => handleFilter("jewelery")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Takı Mücevher</Button>
                    <Button onClick={() => handleFilter("women's clothing")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Kadın Giyim</Button>
                    <Button onClick={() => handleFilter("electronic")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Elektronik</Button>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center text-center flex-wrap mt-6'>
                {
                    products && products.map((product) => (
                        <Product key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default PorductList