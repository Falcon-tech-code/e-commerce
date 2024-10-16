import React, { useState } from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { IoSearchOutline } from "react-icons/io5";


function Header() {

    const [theme, setTheme] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { products } = useSelector((store) => store.basket)

    const changeTheme = () => {
        const body = document.getElementById("body");
        setTheme(!theme);
        if (theme) {
            body.style.backgroundColor = "black"
            body.style.color = "#fff"
        }
        else {
            body.style.backgroundColor = "#fff"
            body.style.color = "black";
        }
    }

    return (
        <div className='flex flex-row items-center justify-between'>
            <div>
                <img onClick={() => navigate("/")} className='w-40 h-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Hepsiburada_logo_official.svg/1024px-Hepsiburada_logo_official.svg.png" alt="company-logo" />
                <div className='flex flex-row gap-2'>
                    <p className='text-orange-500 font-bold'>Premium'u</p>
                    <p className='font-bold'>Keşfet</p>
                </div>
            </div>
            <div className='flex flex-row items-center justify-end text-center border-0 border-b-2 border-b-orange-500'>
                <input className='mr-5 px-3 py-1 outline-none placeholder-black' type="text" placeholder='Ürün arayınız..' />
                <IoSearchOutline />
            </div>
            <div className='flex flex-row gap-3'>
                {theme ? <FaRegMoon className='text-xl text-orange-500 cursor-pointer' onClick={changeTheme} /> : <CiLight className='text-xl text-orange-500 cursor-pointer' onClick={changeTheme} />}

                <div onClick={() => dispatch(setDrawer())} className='flex flex-row gap-1 border-2 border-orange-500 px-3 py-1 cursor-pointer'>
                    <Badge badgeContent={products.length} color="primary">
                        <CiShoppingBasket className='text-2xl cursor-pointer' />
                        <p className='mr-2'>Sepetim</p>
                    </Badge>
                </div>
            </div>
        </div>
    )
}

export default Header