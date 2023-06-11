import { useDispatch, useSelector } from 'react-redux'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { RootState } from '../../redex/store'
import { useEffect } from 'react'
import { callAPICarts } from '../../redex/slice/productSlice'
import ProductsCart from './ProductsCart'
import '../css/styleCart.css'
import '../css/styleLoading.css'
import useCustomVND from '../../hooks/useCustomVND'
import { AiFillTag } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import ClipLoader from 'react-spinners/ClipLoader'

const Cart = () => {
  const products_Cart = useSelector((state: RootState) => state.product.productsCart);
  const loading = useSelector((state: RootState) => state.product.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callAPICarts);
  }, [dispatch]); 

  const total_price = products_Cart.map((item: any) => item.price_sale * item.quantity);

  const total_al_price = total_price.reduce((total, total_price) => {
    return total + total_price
  }, 0)

  const {VND} = useCustomVND();
  return (
    <>
      <Header/> 
      {
        products_Cart.length != 0 &&
        <div className="product-cart">
          <h1>GIỎ HÀNG CỦA BẠN</h1>
          {loading ? <ClipLoader size={'25px'} color='#c98979'/> :
          <>
          {/* mobile */}
          <div className='table-mobile'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xl th-avatar">
                            SẢN PHẨM
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl th-quantity">
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl th-delete">
                        </th>
                    </tr>
                </thead>
                  {
                    products_Cart.map((productCart: any, index: number) => 
                    <ProductsCart key={index} productCart={productCart}/>)
                  }
                  
            </table>
          </div>

          {/* tablet */}
          <div className='table-tablet'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xl">
                            HÌNH ẢNH
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            TÊN SẢN PHẨM
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            GIÁ TIỀN
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            SỐ LƯỢNG
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            TỔNG
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                        </th>
                    </tr>
                </thead>
                  {
                    products_Cart.map((productCart: any, index: number) => 
                    <ProductsCart key={index} productCart={productCart}/>)
                  }
                  
            </table>
          </div>

          {/* pc */}
          <div className='table-pc'>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-500">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-xl">
                            HÌNH ẢNH
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            TÊN SẢN PHẨM
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            GIÁ TIỀN
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            SỐ LƯỢNG
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                            TỔNG
                        </th>
                        <th scope="col" className="px-6 py-3 text-xl">
                        </th>
                    </tr>
                </thead>
                  {
                    products_Cart.map((productCart: any, index: number) => 
                    <ProductsCart key={index} productCart={productCart}/>)
                  }                
            </table>
          </div>
          </>
          }
          <div className='payment'>
            <div className='discount-container'>
              <div className='discount-code'>
                <AiFillTag className='ic-tag'/>
                <h3>Mã giảm giá</h3>
              </div>
              <input type="text" placeholder='Nhập mã ưu đãi'/>
              <button>Áp dụng</button>
            </div>
            <h3>TỔNG TIỀN: {VND.format(total_al_price)}</h3>
            <Link to='/payment'>
              <button className='btn-payment'>TIẾN HÀNH THANH TOÁN</button>
            </Link>
          </div>
        </div>
      }
      
      {
        products_Cart.length == 0 && 
        <div className='cart-none-notification'>
          <h2>GIỎ HÀNG CỦA BẠN ĐANG TRỐNG, VUI LÒNG QUAY LẠI TRANG CHỦ ĐỂ LỰA CHỌN SẢN PHẨM...</h2>
        </div>
      } 
      <Footer/>
    </>
  )
}

export default Cart