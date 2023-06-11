import { useDispatch, useSelector } from 'react-redux'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import './css/styleProductDetails.css'
import { useEffect, useState } from 'react'
import { addProductsCart, callAPIProducts, updateProducts, updateProductsCart} from '../redex/slice/productSlice'
import { AiFillStar, AiOutlineShoppingCart } from 'react-icons/ai'
import { callAPICarts } from '../redex/slice/productSlice'
import { RootState } from '../redex/store'
import { Toaster, toast } from 'react-hot-toast'
import useCustomVND from '../hooks/useCustomVND'

const ProductDetails = () => {
  const products = useSelector((state: any) => state.product.products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callAPIProducts)
  }, [dispatch]);
  
  const id = sessionStorage.getItem('id');
  const product_details = products.find((item: any) => item.id == id);  

  const productsCart = useSelector((state: RootState) => state.product.productsCart);
  useEffect(() => {
    dispatch(callAPICarts)
  }, [dispatch]);

  const quantity = 1;

  const dataProduct = {
    productId:  product_details?.id,
    name:  product_details?.name,
    image_avatar:  product_details?.image_avatar,
    price_old:  product_details?.price_old,
    price_sale:  product_details?.price_sale,
    quantity: quantity,
  };

  const productOfCart: any = productsCart.find((item: any) => item.productId == dataProduct.productId);
  
  const [quantityUpdate, setQuantityUpdate] = useState(productOfCart?.quantity)
  const dataProductUpdate = {
    productId:  product_details?.id,
    name:  product_details?.name,
    image_avatar:  product_details?.image_avatar,
    price_old:  product_details?.price_old,
    price_sale:  product_details?.price_sale,
    quantity: quantityUpdate + 1
  };

  // const updateQuantityProduct = {
  //   name: product_details?.name,
  //   image_avatar: product_details?.image_avatar,
  //   image_detail_1: product_details?.image_detail_1,
  //   image_detail_2: product_details?.image_detail_2,
  //   image_detail_3: product_details?.image_detail_3,
  //   quantity: product_details?.quantity - 1,
  //   price_old: product_details?.price_old,
  //   price_sale: product_details?.price_sale,
  //   description_1: product_details?.description_1,
  //   description_2: product_details?.description_2
  // }
  
  function addTocart() {
    if(productOfCart == undefined) {
      dispatch(addProductsCart(dataProduct));
      // dispatch(updateProducts(updateQuantityProduct, id));
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
        style: {
          fontSize: "0.9rem"
        }
      }) ;
    }
    else if(productOfCart != undefined) {
      setQuantityUpdate(quantityUpdate + 1)
      dispatch(updateProductsCart(dataProductUpdate, productOfCart.id));
      // dispatch(updateProducts(updateQuantityProduct, id));
      toast.success("Thêm sản phẩm vào giỏ hàng thành công", {
        style: {
          fontSize: "0.9rem"
        }
      });
    }
  }
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });

  const {VND} = useCustomVND();

  return (
    <>
    {product_details  && 
    <div>
      <Header/>
      <div className='product-details-container'>
      <h1>THÔNG TIN SẢN PHẨM</h1>
      {/* mobile */}
      <div className='product-details-mobile'>
          <div className='img-container'>
            <img src={product_details.image_avatar} alt="" />
            <div className='img-details'>
              <img src={product_details.image_detail_1} alt="" />
              <img src={product_details.image_detail_2} alt="" />
              <img src={product_details.image_detail_3} alt="" />
            </div>
            <div className='addToCart'>
              <button onClick={addTocart} className='btn-addTocart'>
                ADD TO CART <Toaster position="top-right" />
              </button>
            </div>
          </div>
          <div className='desc-price-container'>
            <h2>Tên sản phẩm: <span>{product_details.name}</span></h2>
            <p>{product_details.description_1}</p>
            <h3>Nhà sản xuất: {product_details.supplier}</h3>
            <p><del>{VND.format(product_details.price_old)}</del></p> 
            <h4>{VND.format(product_details.price_sale)}</h4>
          </div>
        </div>
        {/* tablet+pc */}
        <div className='product-details-tablet-pc'>
          <div className='img-container'>
            <img src={product_details.image_avatar} alt="" />
            <div className='img-details'>
              <img src={product_details.image_detail_1} alt="" />
              <img src={product_details.image_detail_2} alt="" />
              <img src={product_details.image_detail_3} alt="" />
            </div>
          </div>
          <div className='desc-price-container'>
            <h2>Tên sản phẩm: <span>{product_details.name}</span></h2>
            <p>{product_details.description_1}</p>
            <h3>Nhà sản xuất: {product_details.supplier}</h3>
            <p><del>{VND.format(product_details.price_old)}</del></p> 
            <h4>{VND.format(product_details.price_sale)}</h4>
            <div className='shopping-cart' onClick={addTocart}>
              <button className='btn-addTocart'>
                ADD TO CART
              </button>
              <div className='shopping-detailproduct'><AiOutlineShoppingCart className='ic-shopping'/></div> 
              <Toaster position="top-right"/>
            </div>
          </div>
        </div>
        <div className='description_2'>
          <h2>Thông Tin Chi Tiết Sản Phẩm: </h2>
          <p>{ product_details .description_2}</p>
        </div>
        <div className='evaluate-container'>
          <h2>Đánh giá</h2>
          <div className='evaluate'>
            <h3>Đánh giá của bạn</h3>
            <div className='ic-star'>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
              <AiFillStar/>
            </div>
            <h3>Nhận xét của bạn *</h3>
            <textarea name="" id=""></textarea>
            <div className='evaluate-account'>
              <h3>Tên *</h3>
              <input type="text" />
              <h3>Email *</h3>
              <input type="text" />
            </div>
            <button className='btn-send'>GỬI ĐI</button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
    }   
    </>
  )
}

export default ProductDetails