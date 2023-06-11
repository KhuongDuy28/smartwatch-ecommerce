import { FC, useEffect, useState } from 'react'
import '../css/styleProductsCart.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redex/store';
import { AiFillDelete } from 'react-icons/ai';
import { callAPICarts, callAPIProducts, deleteProductsCart, setLoading, updateProducts, updateProductsCart } from '../../redex/slice/productSlice';
import useCustomVND from '../../hooks/useCustomVND';
// import ClipLoader from 'react-spinners/ClipLoader';

const ProductsCart:FC<{productCart: any}> = ({productCart}) => {
    
    const dispatch = useDispatch();

    function deleteProduct() {
        dispatch(deleteProductsCart(productCart.id));
    }

    const productsCart = useSelector((state: RootState) => state.product.productsCart);

    const productOfCart : any = productsCart.find((item: any) => item.productId == productCart.productId);
    
    const [quantityUpdate, setQuantityUpdate] = useState(productOfCart?.quantity)
    const dataProductUpdateAdd = {
        productId: productCart.productId,
        name: productCart.name,
        image_avatar: productCart.image_avatar,
        price_old: productCart.price_old,
        price_sale: productCart.price_sale,
        quantity: quantityUpdate + 1,
    }

    const dataProductUpdateRemote = {
        productId: productCart.productId,
        name: productCart.name,
        image_avatar: productCart.image_avatar,
        price_old: productCart.price_old,
        price_sale: productCart.price_sale,
        quantity: quantityUpdate - 1,
    }

    useEffect(() => {
        dispatch(callAPIProducts)
    }, [dispatch])
    const products = useSelector((state: RootState) => state.product.products);
    const product : any = products.find((item: any) => item.id == productCart.productId);
    // console.log(product);
    
    // const [quantityProduct, setQuantityProduct] = useState(product?.quantity);
    // console.log(product?.quantity);
    
    // const updateAddQuantityProduct = {
    //     name: product?.name,
    //     image_avatar: product?.image_avatar,
    //     image_detail_1: product?.image_detail_1,
    //     image_detail_2: product?.image_detail_2,
    //     image_detail_3: product?.image_detail_3,
    //     quantity: product?.quantity + 1,
    //     price_old: product?.price_old,
    //     price_sale: product?.price_sale,
    //     description_1: product?.description_1,
    //     description_2: product?.description_2
    // }

    // const updateRemoveQuantityProduct = {
    //     name: product?.name,
    //     image_avatar: product?.image_avatar,
    //     image_detail_1: product?.image_detail_1,
    //     image_detail_2: product?.image_detail_2,
    //     image_detail_3: product?.image_detail_3,
    //     quantity: product?.quantity - 1,
    //     price_old: product?.price_old,
    //     price_sale: product?.price_sale,
    //     description_1: product?.description_1,
    //     description_2: product?.description_2
    // }
    
    
    function addCount() {
        setQuantityUpdate(quantityUpdate + 1);
        dispatch(updateProductsCart(dataProductUpdateAdd, productOfCart.id));
        // setQuantityProduct(quantityProduct - 1);
        // dispatch(updateProducts(updateRemoveQuantityProduct, product.id));
    }  

    function removeCount() {
        if(productOfCart.quantity > 1) {
            setQuantityUpdate(quantityUpdate - 1);
            dispatch(updateProductsCart(dataProductUpdateRemote, productOfCart.id));
            // dispatch(updateProducts(updateAddQuantityProduct, product.id));
        }else if(productOfCart.quantity == 1) {
            dispatch(deleteProductsCart(productOfCart.id));
            // dispatch(updateProducts(updateAddQuantityProduct, product.id));
        }
    }

    const {VND} = useCustomVND();

    return ( 
    <>
        <tbody className='body-mobile'>
            <tr className="bg-white">
                <td className="px-6 py-4">
                    <img className='img-product-cart' src={productCart.image_avatar} alt="" />
                    <h3>Tên sản phẩm: {productCart.name}</h3>
                    <h3>Giá: {VND.format(productCart.price_sale)}</h3>
                    <h3>Tổng: {VND.format(productCart.price_sale * productCart.quantity)}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <div className='quantity'>
                        <button onClick={removeCount} className='remove'> - </button>
                        <h3 className='contents'>{productCart.quantity}</h3>
                        <button onClick={addCount} className='add'> + </button>
                    </div>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <AiFillDelete onClick={deleteProduct} className='ic-delete'/>
                </td>
            </tr>
        </tbody>
        <tbody className='body-tablet'>
            <tr className="bg-white">
                <td className="px-6 py-4">
                    <img className='img-product-cart' src={productCart.image_avatar} alt="" />
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <h3 className='name'>{productCart.name}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <h3>{VND.format(productCart.price_sale)}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <div className='quantity'>
                        <button onClick={removeCount} className='remove'>-</button>
                        <h3 className='contents'>{productCart.quantity}</h3>
                        <button onClick={addCount} className='add'>+</button>
                    </div>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <h3>{VND.format(productCart.price_sale * productCart.quantity)}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950">
                    <AiFillDelete onClick={deleteProduct} className='ic-delete'/>
                </td>
            </tr>
        </tbody>

        
        <tbody className='body-pc'>
            <tr className="bg-white">
                <td className="px-6 py-4 td-avatar">
                    <img className='avatar' src={productCart.image_avatar} alt="" />
                </td>
                <td className="px-6 py-4 dark:text-gray-950 td-name">
                    <h3 className='name'>{productCart.name}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950 td-price-cart">
                    <h3 className='price-cart'>{VND.format(productCart.price_sale)}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950 td-quantity">
                    <div className='quantity'>
                        <button onClick={removeCount} className='remove'>-</button>
                        <h3 className='contents'>{productCart.quantity}</h3>
                        <button onClick={addCount} className='add'>+</button>
                    </div>
                </td>
                <td className="px-6 py-4 dark:text-gray-950 td-total">
                    <h3 className='total'>{VND.format(productCart.price_sale * productCart.quantity)}</h3>
                </td>
                <td className="px-6 py-4 dark:text-gray-950 td-delete">
                    <AiFillDelete onClick={deleteProduct} className='ic-delete'/>
                </td>
            </tr>
        </tbody>
    </>
  )
}

export default ProductsCart