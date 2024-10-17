import React, { useEffect, useState } from 'react'
import { CiShoppingBasket } from "react-icons/ci";
import { CiLight } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../redux/slices/basketSlice';
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";


function Header() {

    const [theme, setTheme] = useState(false);

    const [loading, setLoading] = useState(false);

    const [posts, setPosts] = useState([]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const loadPosts = async () => {
            setLoading(true);
            const response = await axios.get("https://fakestoreapi.com/products");
            setPosts(response.data);
            setLoading(false);
        }
        loadPosts();
    }, [])

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { products } = useSelector((store) => store.basket)


    const changeTheme = () => {
        const body = document.getElementById("body");
        const searchInput = document.getElementById("search-Input")
        setTheme(!theme);
        if (theme) {
            body.style.backgroundColor = "black"
            body.style.color = "#fff"
            searchInput.style.backgroundColor = "black"
            searchInput.classList.add('placeholder-white');
            searchInput.classList.remove('placeholder-black');
        }
        else {
            body.style.backgroundColor = "#fff"
            body.style.color = "black";
            searchInput.style.backgroundColor = "#fff"
            searchInput.classList.add('placeholder-black');
            searchInput.classList.remove('placeholder-white');
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
            <div>
                <div className='flex flex-row items-center justify-end text-center border-0 border-b-2 border-b-orange-500'>
                    <input id='search-Input' className='mr-5 px-3 py-1 outline-none placeholder-black' type="text" onChange={(e) => setSearch(e.target.value)} placeholder='Ürün arayınız..' />
                    <IoSearchOutline />
                </div>
                <div>
                    {loading ? (<h4>Yükleniyor...</h4>) : (
                        (posts
                            .filter((value) => {
                                if (search === "") {
                                } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
                                    return value
                                }
                            })
                            .map(item => <div key={item.id} className='w-[550px] font-bold text-xl mt-5 flex flex-row items-center justify-between text-center gap-3 border border-gray-400 p-3 rounded-md' onClick={() => navigate("/product-details/" + item.id)}><img className='w-[50px] h-[60px]' src={item.image}></img>{item.title}<p className='text-2xl'>{item.price}₺</p></div>))
                    )}
                </div>
            </div>
            <div className='flex flex-row gap-3'>
                {theme ? <CiLight className='text-xl text-orange-500 cursor-pointer' onClick={changeTheme} /> : <FaRegMoon className='text-xl text-orange-500 cursor-pointer' onClick={changeTheme} />}

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