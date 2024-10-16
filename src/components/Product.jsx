import React from 'react'
import { Rating } from 'primereact/rating';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Product({ product }) {
    const { id, price, image, title, description, rating } = product;

    const navigate = useNavigate();


    return (
        <div className='w-[220px] h-[460px] shadow-lg shadow-gray-400 rounded-lg m-3 hover:shadow-2xl transition duration-300 cursor-pointer'>
            <img className='w-48 h-64' src={image} alt="product_image" />
            <div>
                <p className='text-center h-12'>{title}</p>
                <Rating className='mt-14' value={rating.rate} onChange={(e) => setValue(e.rating.value)} readOnly cancel={false} />
                <h3 className='text-start font-bold'>{price}₺</h3>
            </div>
            <div className='mt-2'>
                <Button onClick={() => navigate("/product-details/" + id)} className='detail-button' size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Ürün Detayı</Button>
            </div>
        </div>
    )
}

export default Product