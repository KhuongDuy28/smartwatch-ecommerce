import { Management } from "./Management"
import '../css/styleProductsManagement.css'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redex/store";
import { useEffect, useState } from "react";
import { callAPIProducts, deleteMultipleProducts, deleteProduct } from "../../redex/slice/productSlice";
import ModalProduct from "./ModalProduct";
import {IoAdd} from 'react-icons/io5'
import { AiOutlineDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import {Toaster, toast} from "react-hot-toast"
import useCustomVND from "../../hooks/useCustomVND";

const ProductsManagement = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callAPIProducts)
  }, [dispatch])
  const products = useSelector((state: RootState) => state.product.products);
  
  const [modal, setModal] = useState(false)
  
  function openModal() {
    setModal(true);
  } 

  function openModalUpdate(e: any) {
    setModal(true) 
    sessionStorage.setItem("idUpdate", e.target.id)  
    // dispatch(updateProductAction(e.target.id))
  }
  
  function handleActiveModal(valueModal: any) {
    setModal(valueModal)
  }

  const [search, setSearch] = useState("")
  function searchProductAdmin(e: any) {
    setSearch(e.target.value)
  }

  const searchProduct = products.filter((item: any) => (item.name).toLowerCase().includes(search.toLowerCase()));

  const [isChecked, setIsChecked] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);

  function handleCheckChange(e: any, id: number) {
    if(e.target.checked) {
      setIsChecked([...isChecked, id])
    }
    else {
      setIsChecked(isChecked.filter((rowId : any) => rowId !== id))
    }
  }

  const handleSelectAllChange = (e: any) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allRowIds = products.map((row: any) => row.id);
      setIsChecked(allRowIds);
    } else {
      setIsChecked([]);
    }
  };

  function deleteProducts() {
    dispatch(deleteMultipleProducts(isChecked));
    toast.success('Bạn đã xóa thành công', {
      style: {
        fontSize: "1rem"
      }
    })
  }

  function deleteOneProduct(e: any) {
    dispatch(deleteProduct(e.target.id));
    toast.success('Bạn đã xóa thành công', {
      style: {
        fontSize: "1rem"
      }
    })
  }

  const {VND} = useCustomVND();

  // const [currenPage, setCurenPage] = useState(1);
  // const recordsPerPage = 2;
  // const lastIndex = currenPage * recordsPerPage;
  // const firstIndex = lastIndex - recordsPerPage;
  // const records = products.slice(firstIndex, lastIndex); 
  // const npage = Math.ceil(products.length / recordsPerPage); 

  // function prevPage() {
  //   if(currenPage !== firstIndex) {
  //     setCurenPage(currenPage - 1)
  //   }   
  // }
  
  // function nextPage() {
  //   if(currenPage !== lastIndex) {
  //     setCurenPage(currenPage + 1)
  //   }
  // }
  
  return (
    <div className="container-products">
      <Management/>
      {modal == true ? <ModalProduct onModal={handleActiveModal}/> : 
      <div className="products-management">
        <input className="search" type="text" placeholder="Nhập thông tin bạn muốn tìm kiếm" onChange={searchProductAdmin}/>  
        <div className="container-button">
          <div className="delete-all">
            <input type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}/>
            <button onClick={deleteProducts} className="delete-multiple">DELETE <Toaster position="top-center"/> </button> 
          </div>
          {/* <div className="modal-navigate"> */}
            <div className="modal-products">
              <IoAdd className="open-modal" onClick={openModal}/>
            </div>
            {/* <div className="navigate-admin-products">
              <MdSkipPrevious className="navigate-before-admin" onClick={prevPage} />
              <MdSkipNext className="navigate-next-admin" onClick={nextPage} />
            </div> */}
          {/* </div> */}
        </div>
        <div className="relative overflow-x-auto container-table">
            <table className="w-full text-sm text-left text-white">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            #
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Avatar
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image 1
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image 2
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Image 3
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Quantity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price Old
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price Sale
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Supplier
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Info
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Info Details
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                    </tr>
                </thead>
               
                <tbody>
                  {!searchProduct && 
                    <>
                    {products.map((product: any) =>                 
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td scope="row" className="px-6 py-4">
                        <input type="checkbox" name={product.name} value={product.id} checked={isChecked.includes(product.id)} onChange={(e: any) => handleCheckChange(e, product.id)}/>
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_avatar} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_1} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_2} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_3} alt="" />
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.quantity}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {VND.format(product.price_old)}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {VND.format(product.price_sale)}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.supplier}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.description_1}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.description_2}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        <RxUpdate id={product.id} onClick={openModalUpdate} className="btn-update"/>
                        <AiOutlineDelete className="btn-delete" id={product.id} onClick={deleteOneProduct}/> 
                         <Toaster position="top-center"/>
                      </td>
                    </tr>
                    )}
                    </>
                  }

                  {searchProduct && 
                    <>
                    {searchProduct.map((product: any) =>                 
                    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td scope="row" className="px-6 py-4">
                        <input type="checkbox" name={product.name} value={product.id} checked={isChecked.includes(product.id)} onChange={(e) => handleCheckChange(e, product.id)}/>
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.name}
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_avatar} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_1} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_2} alt="" />
                      </td>
                      <td className="px-6 py-4">
                        <img src={product.image_detail_3} alt="" />
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.quantity}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {VND.format(product.price_old)}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {VND.format(product.price_sale)}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.supplier}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.description_1}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        {product.description_2}
                      </td>
                      <td scope="row" className="px-6 py-4">
                        <RxUpdate id={product.id} onClick={openModalUpdate} className="btn-update"/>
                        <AiOutlineDelete className="btn-delete" id={product.id} onClick={deleteOneProduct}/> 
                        <Toaster position="top-center"/>
                      </td>
                    </tr>
                    )}
                    </>
                  }
                </tbody>

            </table>
        </div>   
      </div>
      }
   </div> 
  )
}

export default ProductsManagement

