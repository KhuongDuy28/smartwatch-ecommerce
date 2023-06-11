import { useDispatch, useSelector } from "react-redux"
import Footer from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { RootState } from "../../redex/store";
import { useEffect, useState } from "react";
import { callAPIProducts } from "../../redex/slice/productSlice";
import Product from "./Product";
import "../css/styleHome.css"
import { MdSkipNext, MdSkipPrevious } from "react-icons/md"
import useScroll from "../../hooks/useScroll";
import { BiArrowToTop } from "react-icons/bi";

const Home = () => {

  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);

  useEffect(() => {
    dispatch(callAPIProducts)
  }, [dispatch]);

  const search = useSelector((state: RootState) => state.product.searchProduct);
  const searchProduct = products.filter((item: any) =>  (item.name).toLowerCase().includes(search.toLowerCase()));
  
  const {showGoToTop, BackToTop} = useScroll();

  const searchBySupplier : any = useSelector((state: RootState) => state.product.searchProductBySupplier);

  const searchProductBySupplier = products.filter((item: any) => 
  (item.supplier).toLowerCase().includes((searchBySupplier.name || '').toLowerCase()));  
  
  const [currenPage, setCurenPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currenPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex); 
  const npage = Math.ceil(products.length / recordsPerPage); 

  function prevPage() {
    if(currenPage !== firstIndex) {
      setCurenPage(currenPage - 1)
    }   
  }
  
  function nextPage() {
    if(currenPage !== lastIndex) {
      setCurenPage(currenPage + 1)
    }
  }
  
  return (
    <>
      <Header/>
      <div>
        <img  src="https://wallpaperaccess.com/full/2067392.jpg" alt="" />
      </div>
      <div className="home">
        <h1 className="content">SMARTWATCH</h1>
        <div className="all-products">
          {
            !search && searchProductBySupplier.length == products.length &&
            records.map((product: any) => <Product key={product.id} product={product}/>)
          }
          {
            search && 
            searchProduct.map((product: any) => <Product key={product.id} product={product}/>)
          }
          {
            searchProductBySupplier.length < products.length && !search && 
            searchProductBySupplier.map((product: any) => <Product key={product.id} product={product}/>)
          }
        </div>
        <div className="navigate">
          {
            currenPage == 1 && 
            <MdSkipNext className="navigate-next" onClick={nextPage}/>
          }
          {
            currenPage == npage && 
            <MdSkipPrevious className="navigate-before" onClick={prevPage}/>
          }
          {
            currenPage != 1 && currenPage != npage &&
            <>
            <MdSkipPrevious className="navigate-before" onClick={prevPage} />
            <MdSkipNext className="navigate-next" onClick={nextPage} />
            </>
          }
        </div>
      </div>
      {
        showGoToTop && <BiArrowToTop className="back_to_top" onClick={BackToTop}/>
      }
      <Footer/>
    </>
  )
}

export default Home