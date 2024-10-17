import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetails from '../components/ProductDetails'
import Checkout from '../components/Checkout'

function RouterConfig() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product-details/:id' element={<ProductDetails />} />
            <Route path='/checkout' element={<Checkout />} />
        </Routes>
    )
}

export default RouterConfig