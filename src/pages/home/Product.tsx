import { FC, useEffect, useState } from "react"
import "../css/styleProduct.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductsCart, callAPICarts, updateProducts, updateProductsCart } from "../../redex/slice/productSlice";
import { RootState } from "../../redex/store";
import useCustomVND from "../../hooks/useCustomVND";

const Product:FC<{product: any}> = (product) => {
  const dispatch = useDispatch();
  const products_cart = useSelector((state: RootState) => state.product.productsCart);
  
  function submit() {
    sessionStorage.setItem('id', product.product.id);
  }

  const quantity = 1;
  const product_addCart = {
    productId: product.product.id,
    name: product.product.name,
    image_avatar: product.product.image_avatar,
    price_old: product.product.price_old,
    price_sale: product.product.price_sale,
    quantity: quantity
  };

  // const updateQuantityProduct = {
  //   name: product.product.name,
  //   image_avatar: product.product.image_avatar,
  //   image_detail_1: product.product.image_detail_1,
  //   image_detail_2: product.product.image_detail_2,
  //   image_detail_3: product.product.image_detail_3,
  //   quantity: product.product.quantity - 1,
  //   price_old: product.product.price_old,
  //   price_sale: product.product.price_sale,
  //   description_1: product.product.description_1,
  //   description_2: product.product.description_2
  // }

  const productsOfCart: any = products_cart.find((item: any) => item.productId == product_addCart.productId);

  const [quantityUpdate, setQuantityUpdate] = useState(productsOfCart?.quantity);
  const product_updateCart = {
    productId: product.product.id,
    name: product.product.name,
    image_avatar: product.product.image_avatar,
    price_old: product.product.price_old,
    price_sale: product.product.price_sale,
    quantity: quantityUpdate + 1
  };

  function buynow() {
    if(productsOfCart == undefined) {
      dispatch(addProductsCart(product_addCart));
      // dispatch(updateProducts(updateQuantityProduct, product.product.id));
    }else if(productsOfCart!= undefined) {
      setQuantityUpdate(quantityUpdate + 1)
      dispatch(updateProductsCart(product_updateCart, productsOfCart.id));
      // dispatch(updateProducts(updateQuantityProduct, product.product.id));
    }
  }

  const {VND} = useCustomVND();

  return (
    <div className="product-container">
        <Link to='/product-details'>
        <div onClick={submit} className="product">
          <img className="image-avatar" src={product.product.image_avatar} alt="" />
          <h3>{product.product.name}</h3>
          <div className="price">
            <del>{VND.format(product.product.price_old)}</del>
            <p><b>{VND.format(product.product.price_sale)}</b></p>
          </div>
        </div>
        </Link>
        <div className="add-cart-buynow">
        <Link className="buynow" to='/cart'>
          <button onClick={buynow} type="button" >Buy Now</button>
        </Link>
        </div>
    </div>
  )
}

export default Product