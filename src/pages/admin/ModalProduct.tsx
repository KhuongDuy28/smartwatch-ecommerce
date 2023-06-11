import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import '../css/styleModal.css'
import { FaTimes } from "react-icons/fa";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redex/store";
import { addProducts, callAPISuppliers, updateProducts } from "../../redex/slice/productSlice";
import {Toaster, toast} from 'react-hot-toast'

const schema = yup.object({
  name: yup.string().required(),
  image_avatar: yup.string().required(),
  image_detail_1: yup.string().required(),
  image_detail_2: yup.string().required(),
  image_detail_3: yup.string().required(),
  quantity: yup.number().positive().integer().required(),
  price_old: yup.number().positive().integer().required(),
  price_sale: yup.number().positive().integer().required(),
  description_1: yup.string().required(),
  description_2: yup.string().required(),
  supplier: yup.string().required()
})

type FormData = yup.InferType<typeof schema>;

const ModalProduct:FC<{onModal: (valueModal: boolean) => void}> = ({onModal}) => {

  const suppliers = useSelector((state: RootState) => state.product.suppliers);
  const products : any = useSelector((state: RootState) => state.product.products);

  const idUpdate = sessionStorage.getItem("idUpdate");
  const productUpdate = products.find((item: any) => item.id == idUpdate);
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callAPISuppliers);
  }, [dispatch])
  

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmitAdd = (data: FormData) => {
    dispatch(addProducts(data));
    toast.success("Bạn đã thêm mới thành công", {
      style: {
        fontSize: "0.9rem"
      }
    });
    onModal(false)
  }

  const onSubmitUpdate = (data: FormData) => { 
    dispatch(updateProducts(data, productUpdate.id));
    toast.success("Bạn đã cập nhật thành công", {
      style: {
        fontSize: "0.9rem"
      }
    });
    onModal(false);
    sessionStorage.removeItem("idUpdate");
  }

  function close() {
    onModal(false);
    sessionStorage.removeItem("idUpdate")
  }

  return (
    <div className="modal-container">
        <div className="modal">
          <div className="close-modal">
            <FaTimes onClick={close} />
          </div>
          {!idUpdate ? <form onSubmit={handleSubmit(onSubmitAdd)}>
            <div className="info-1">
            <h3>Tên sản phẩm</h3>
              <input {...register("name")} />
              <p>{errors.name?.message}</p>
            
              <h3>Ảnh đại diện</h3>
              <input {...register("image_avatar")} />
              <p>{errors.image_avatar?.message}</p>

              <h3>Ảnh chi tiết 1</h3>
              <input {...register("image_detail_1")} />
              <p>{errors.image_detail_1?.message}</p>

              <h3>Ảnh chi tiết 2</h3>
              <input {...register("image_detail_2")} />
              <p>{errors.image_detail_2?.message}</p>

              <h3>Ảnh chi tiết 3</h3>
              <input {...register("image_detail_3")} />
              <p>{errors.image_detail_3?.message}</p>

              <h3>Số lượng</h3>
              <input {...register("quantity")} />
              <p>{errors.quantity?.message}</p>

              <h3>Supplier</h3>
              <select {...register("supplier")}>
                {suppliers.map((supplier: any) =>
                  <option key={supplier.id} value={supplier.name}>{supplier.name}</option>
                )}
              </select>
              <p>{errors.supplier?.message}</p>
            </div>

            <div className="info-2">
              <h3>Giá gốc</h3>
              <input {...register("price_old")} />
              <p>{errors.price_old?.message}</p>

              <h3>Giá sale</h3>
              <input {...register("price_sale")} />
              <p>{errors.price_sale?.message}</p>

              <h3>Giới thiệu thông tin</h3>
              <input {...register("description_1")} />
              <p>{errors.description_1?.message}</p>

              <h3>Mô tả thông tin chi tiết</h3>
              <textarea {...register("description_2")} />
              <p>{errors.description_2?.message}</p>

              <div className="add-product">
                <button className="btn-add-product">
                  THÊM MỚI <Toaster position="top-center"/> 
                </button>
              </div>
            </div>
          </form>
          : 
          <form onSubmit={handleSubmit(onSubmitUpdate)}>
            <div className="info-1">
            <h3>Tên sản phẩm</h3>
              <input defaultValue={productUpdate.name} {...register("name")} />
              <p>{errors.name?.message}</p>
            
              <h3>Ảnh đại diện</h3>
              <input defaultValue={productUpdate.image_avatar} {...register("image_avatar")} />
              <p>{errors.image_avatar?.message}</p>

              <h3>Ảnh chi tiết 1</h3>
              <input defaultValue={productUpdate.image_detail_1} {...register("image_detail_1")} />
              <p>{errors.image_detail_1?.message}</p>

              <h3>Ảnh chi tiết 2</h3>
              <input defaultValue={productUpdate.image_detail_2} {...register("image_detail_2")} />
              <p>{errors.image_detail_2?.message}</p>

              <h3>Ảnh chi tiết 3</h3>
              <input defaultValue={productUpdate.image_detail_3} {...register("image_detail_3")} />
              <p>{errors.image_detail_3?.message}</p>

              <h3>Số lượng</h3>
              <input defaultValue={productUpdate.quantity} {...register("quantity")} />
              <p>{errors.quantity?.message}</p>

              <h3>Supplier</h3>
              <select defaultValue={productUpdate.supplier} {...register("supplier")}>
                {suppliers.map((supplier: any) =>
                  <option key={supplier.id} defaultValue={supplier.name}>{supplier.name}</option>
                )}
              </select>
              <p>{errors.supplier?.message}</p>
            </div>

            <div className="info-2">
              <h3>Giá gốc</h3>
              <input defaultValue={productUpdate.price_old} {...register("price_old")} />
              <p>{errors.price_old?.message}</p>

              <h3>Giá sale</h3>
              <input defaultValue={productUpdate.price_sale} {...register("price_sale")} />
              <p>{errors.price_sale?.message}</p>

              <h3>Giới thiệu thông tin</h3>
              <input defaultValue={productUpdate.description_1} {...register("description_1")} />
              <p>{errors.description_1?.message}</p>

              <h3>Mô tả thông tin chi tiết</h3>
              <textarea defaultValue={productUpdate.description_2} {...register("description_2")} />
              <p>{errors.description_2?.message}</p>

              <div className="add-product">
                <button className="btn-add-product">
                  CẬP NHẬT <Toaster position="top-center"/>
                </button>
              </div>
            </div>
          </form>
          }
        </div>
    </div>
  )
}

export default ModalProduct