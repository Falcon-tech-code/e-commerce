import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { calculateBasket, deleteFromBasket, setDrawer } from './redux/slices/basketSlice'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function App() {

  const { products, drawer, totalAmount } = useSelector((store) => store.basket);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(calculateBasket());
  }, [])

  const dispatch = useDispatch();

  const handleRemoveFromBasket = (product) => {
    dispatch(deleteFromBasket(product));
    dispatch(calculateBasket());
  }



  return (
    <div>
      <PageContainer>
        <Loading />
        <Drawer anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
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
          <div>
            <p className='text-center'>Toplam Tutar: {totalAmount.toFixed(2)}₺</p>
            <div className='flex flex-row justify-center items-center text-center mt-3'>
              <Button onClick={() => navigate("/checkout")} size='small' style={{ backgroundColor: '#eb5e2f' }} variant="contained">Ödemeye Devam Et</Button>
            </div>
          </div>
        </Drawer>
        <Header />
        <RouterConfig />
      </PageContainer>
    </div>
  )
}



export default App
