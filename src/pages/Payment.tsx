import { useDispatch, useSelector } from "react-redux"
import { toast, Toaster } from 'react-hot-toast'
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import '../pages/css/stylePayment.css'
import { RootState } from "../redex/store"
import useCustomVND from "../hooks/useCustomVND"
import { useEffect } from "react"
import { callAPICarts, callAPIProducts, deleteAllProductsCart } from "../redex/slice/productSlice"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
  name: yup.string().required('Tên không được để trống, vui lòng nhập đầy đủ thông tin!'),
  city: yup.string().required('Tỉnh / Thành Phố không được để trống, vui lòng nhập đầy đủ thông tin!'),
  district: yup.string().required('Huyện / Quận không được để trống, vui lòng nhập đầy đủ thông tin!'),
  village: yup.string().required('Xã / Phường không được để trống, vui lòng nhập đầy đủ thông tin!'),
  address: yup.string().required('Địa chỉ không được để trống, vui lòng nhập đầy đủ thông tin!'),
  note: yup.string(),
  radio: yup.string().required('Vui lựa chọn phương thức thanh toán!'),
}).required();
type FormData = yup.InferType<typeof schema>;

const Payment = () => {   
    const products_cart : any = useSelector((state: RootState) => state.product.productsCart); 

    const dispatch = useDispatch();
    useEffect(() =>{
        dispatch(callAPICarts);
        dispatch(callAPIProducts);
    }, [dispatch]) 
    const {VND} = useCustomVND();
 
    const total_price = products_cart.map((item: any) => item.price_sale * item.quantity);
    const total_all_price = total_price.reduce((total: number, total_price: any) => {
        return total + total_price
    }, 0)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
      });
    const onSubmit = (data: FormData) => console.log(data); 

    function order() {
        const arrId = products_cart.map((item: any) => item.id);
        dispatch(deleteAllProductsCart(arrId));
        toast.success("Chúc mừng, bạn đã đặt hàng thành công", {
            style: {
              fontSize: "0.9rem"
            }
          });  
    }

    return (
    <>
        <Header/>
        <div className="payment-container">
            <div className="payment-info-user">
                <h2>THÔNG TIN THANH TOÁN</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3>Tên *</h3>
                    <input {...register("name")} />
                    <p>{errors.name?.message}</p>
                        
                    <h3>Tỉnh / Thành Phố *</h3>
                    <input {...register("city")} />
                    <p>{errors.city?.message}</p>

                    <h3>Huyện / Quận *</h3>
                    <input {...register("district")} />
                    <p>{errors.district?.message}</p>

                    <h3>Xã / Phường *</h3>
                    <input {...register("village")} />
                    <p>{errors.village?.message}</p>

                    <h3>Địa chỉ *</h3>
                    <input {...register("address")} />
                    <p>{errors.address?.message}</p>
                    
                    <h3>Ghi chú đơn hàng (tùy chọn) *</h3>
                    <textarea {...register("note")} placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn..."/>
                    <p>{errors.note?.message}</p>
                </form>
            </div>

            <div className="order-info-user">
                <h2>ĐƠN HÀNG CỦA BẠN</h2>
                <h3>Sản phẩm *</h3>
                {products_cart.map((item : any) =>                 
                <div key={item.id} className="order-details">
                    <p className="name">{item.name} </p>
                    <p className="quantity">x{item.quantity}</p>
                    <span className="total">Tổng: {VND.format(item.quantity * item.price_sale)}</span>
                </div>
                )}

                <div className="transport">
                    <h3>Giao hàng *</h3>
                   {total_all_price >= 10000000 ? <p>Giao hàng miễn phí</p> : <p>Phí vận chuyển cho đơn hàng: {VND.format(50000)}</p>}
                </div>
                <h3>Tổng tiền *</h3>
                <p>{VND.format(total_all_price)}</p>
                <div>
                    <h3>Phương thức thanh toán *</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="choose-payment">
                            <div>
                                <input type="radio" {...register("radio")} /> Thanh toán khi nhận hàng
                            </div>
                            <div>
                                <input type="radio" {...register("radio")} /> Thanh toán ngân hàng
                            </div>
                            <div>
                                <input type="radio" {...register("radio")} /> Thanh toán ví điện tử
                            </div>
                        </div>
                        <p style={{color: 'red'}}>{errors.radio?.message}</p>
                    </form>
                </div>
                <form onSubmit={handleSubmit(order)}>
                    <button className="btn-order">ĐẶT HÀNG <Toaster position="top-right"/> </button>
                </form>
            </div>
        </div>
        <Footer/>
    </>
    )
}

export default Payment