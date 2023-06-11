import { Link } from "react-router-dom"
import './style.css'
import {AiFillHeart, AiOutlineShopping} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redex/store"
import { useEffect, useState } from "react"
import { callAPICarts, callAPISuppliers, searchProductAction, searchProductBySupplierAction } from "../../redex/slice/productSlice"
import { FaBars, FaTimes } from "react-icons/fa"

const Header = () => {
    const [searchProduct, setSearchProduct] = useState("");
    useEffect(() => {
        setSearchProduct
    }, [])
    const productsCart = useSelector((state: RootState) => state.product.productsCart); 
    const suppliers = useSelector((state: RootState) => state.product.suppliers); 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(callAPICarts);
        dispatch(callAPISuppliers);
    }, [dispatch])

    useEffect(() => {
        dispatch(searchProductAction(searchProduct));   
    }, [dispatch, searchProduct]) 

    function searchBySupplier(e: any) {
       const searchSupplier = suppliers.find((item: any) => item.id == e.target.id);
       dispatch(searchProductBySupplierAction(searchSupplier))
       
    }
      
    return (
        <div className="header-container">
            <div className="header-top">
                <label htmlFor="nav-mobile-input" className="navber-mobile">
                   <FaBars className="ic-navber-mobile"/>
                </label>
                <input type="checkbox" id="nav-mobile-input" className="nav-input"/>
                <label htmlFor="nav-mobile-input" className="nav-overlay"></label>
                {/* mobile */}
                <div className="header-main-mobile">
                    <label htmlFor="nav-mobile-input">
                        <FaTimes className="ic-close"/>
                    </label>
                    <Link to='/'><li>TRANG CHỦ</li></Link>
                    <Link to='/'><li>GIỚI THIỆU</li></Link>
                    <Link to='/'><li>BLOGS</li></Link>
                    <Link to='/'><li>LIÊN HỆ</li></Link>
                    <Link to='/login'><li>ĐĂNG NHẬP</li></Link>
                </div>
                <div className="header-top-left">
                    <Link to='/'>
                        <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/logo-mona-2.png" alt="" />
                    </Link>
                </div>
                {/* tablet + laptop */}
                <div className="header-top-center">
                    <input type="text" placeholder="Tìm kiếm..." onChange={(e) => setSearchProduct(e.target.value)}/>
                    <div className="search">
                        <BiSearch className="ic-search"/> 
                    </div>
                </div>

                {/* mobile */}
                <div className="header-top-right-mobile">
                    <Link to='/cart'>
                        <AiOutlineShopping className="ic-cart"/>
                    </Link>
                    <span>{productsCart.length}</span>    
                </div>
                {/* tablet + laptop */}
                <div className="header-top-right-tablet-pc">
                    <span><Link to='/login'>ĐĂNG NHẬP</Link></span>
                    <AiFillHeart className="ic-heart"/>
                    <div className="shopping">
                        <Link to='/cart'>
                            <AiOutlineShopping className="ic-cart"/>
                        </Link>
                        <span>{productsCart.length}</span>
                    </div>
                </div>
                
            </div>

            {/* tablet+pc */}
            <div className="header-main-tablet-pc">
                <li><Link to='/'>TRANG CHỦ</Link></li>
                <li><Link to='/'>GIỚI THIỆU</Link></li>
                <li className="dropdown">SMARTWATCH
                    <ul className="dropdown-content">
                        {suppliers.map((supplier: any) => 
                            <li key={supplier.id} id={supplier.id} onClick={searchBySupplier}>{supplier.name}</li>
                        )}
                    </ul>   
                </li>
                <li><Link to='/'>BLOGS</Link></li>
                <li><Link to='/'>LIÊN HỆ</Link></li>
            </div>
        </div>
    )
}

export default Header