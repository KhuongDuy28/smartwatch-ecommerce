import { Dispatch, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    products: [],
    productsCart: [],
    suppliers: [],
    searchProduct: '',
    searchProductBySupplier: {},
    loading: false,
    idProductUpdate: 0,
    deleteMultiple: []
}

const callAPIProducts: any = async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3005/products`);
        dispatch(getAPIProductsAction(res.data))
        // console.log(res.data.data);  
    } catch (error) {
        throw new Error('Đã có lỗi xảy ra')
    }
}

const callAPISuppliers: any = async (dispatch: Dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3005/suppliers`);
        dispatch(getAPISuppliersAction(res.data))
        // console.log(res.data.data);  
    } catch (error) {
        throw new Error('Đã có lỗi xảy ra')
    }
}

const addProducts: any = (dataProduct: any) => async (dispatch: Dispatch) => {
    await axios.post(`http://localhost:3005/products`, dataProduct)
        .then(() => {
            dispatch(addProductAction(dataProduct));
            dispatch(callAPIProducts);
        })
        .catch(() => {
            throw new Error('Đã có lỗi xảy ra')
        })
}

const addProductsCart: any = (dataProduct: any) => async (dispatch: Dispatch) => {
    await axios.post(`http://localhost:3005/carts`, dataProduct)
        .then(() => {
            dispatch(addCartAction(dataProduct));
            dispatch(callAPIProducts);
        })
        .catch(() => {
            throw new Error('Đã có lỗi xảy ra')
        })
}

const updateProductsCart: any = (dataProduct: any, id: any) => async (dispatch: Dispatch) => {
    await axios.put(`http://localhost:3005/carts/${id}`, dataProduct)
        .then(() => {
            // dispatch(updateCartAction(dataProduct));
            dispatch(callAPICarts);
            // dispatch(callAPICarts);
        })
        .catch(() => {
            throw new Error('Đã có lỗi xảy ra')
        })
}

const updateProducts: any = (dataProduct: any, id: any) => async (dispatch: Dispatch) => {
    await axios.put(`http://localhost:3005/products/${id}`, dataProduct)
        .then(() => {
            // dispatch(updateCartAction(dataProduct));
            dispatch(callAPIProducts);
            // dispatch(callAPICarts);
        })
        .catch(() => {
            throw new Error('Đã có lỗi xảy ra')
        })
}


const deleteProductsCart: any = (id: number) => async (dispatch: Dispatch) => {
    try {
        await axios.delete(`http://localhost:3005/carts/${id}`)
            .then(() => {
                dispatch(callAPICarts)
            })
    } catch (error) {
        throw new Error('Đã có lỗi xảy ra')
    }
}

const deleteAllProductsCart: any = (arrId: []) => async (dispatch: Dispatch) => {
    const deleteRequest = arrId.map((id: number) => {
        return axios.delete(`http://localhost:3005/carts/${id}`)
    });
    try {
        await Promise.all(deleteRequest);
        dispatch(callAPICarts);
    } catch (error) {
        throw new Error('Da co loi xay ra');
    }
}

const deleteMultipleProducts: any = (arrId: []) => async (dispatch: Dispatch) => {
    const deleteRequest = arrId.map((id: number) => {
        return axios.delete(`http://localhost:3005/products/${id}`)
    });
    try {
        await Promise.all(deleteRequest);
        dispatch(callAPIProducts);
    } catch (error) {
        throw new Error('Da co loi xay ra');
    }
}

const deleteProduct: any = (id: number) => async (dispatch: Dispatch) => {
    try {
        await axios.delete(`http://localhost:3005/products/${id}`)
            .then(() => {
                dispatch(callAPIProducts)
            })
    } catch (error) {
        throw new Error('Đã có lỗi xảy ra')
    }
}

const callAPICarts: any = async (dispatch: Dispatch) => {
    try {
        dispatch(setLoading(true));
        const res = await axios.get(`http://localhost:3005/carts`);
        dispatch(getAPICartAction(res.data));
        dispatch(setLoading(false));
    } catch (error) {
        dispatch(setLoading(false))
        throw new Error('Đã có lỗi xảy ra')
    }
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        getAPIProductsAction: (state, action) => {
            return {
                ...state,
                products: action.payload
            }
        },
        addCartAction: (state: any, action) => {
            return {
                ...state,
                productsCart: [...state.productsCart, action.payload]
            }
        },
        addProductAction: (state: any, action) => {
            return {
                ...state,
                productsCart: [...state.productsCart, action.payload]
            }
        },
        getAPISuppliersAction: (state, action) => {
            return {
                ...state,
                suppliers: action.payload
            }
        },
        getAPICartAction: (state, action) => {
            return {
                ...state,
                productsCart: action.payload
            }
        },
        searchProductAction: (state, action) => {
            return {
                ...state,
                searchProduct: action.payload
            }
        },
        searchProductBySupplierAction: (state, action) => {            
            return {
                ...state,
                searchProductBySupplier: action.payload
            }
        },
        setLoading: (state, action) => {
            return {
                ...state,
                loading: action.payload
            }
        }, 
        updateProductAction: (state, action) => {    
            console.log(action.payload);
                 
            return {
                ...state,
                idProductUpdate: action.payload
            }
        }
    }
})

export default productSlice.reducer
export const { getAPIProductsAction, getAPICartAction, addCartAction, searchProductAction, setLoading, getAPISuppliersAction, addProductAction, updateProductAction, searchProductBySupplierAction } = productSlice.actions
export { callAPIProducts, addProductsCart, callAPICarts, updateProductsCart, deleteProductsCart, deleteAllProductsCart, updateProducts, callAPISuppliers, addProducts, deleteMultipleProducts, deleteProduct }