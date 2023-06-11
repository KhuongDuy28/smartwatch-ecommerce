import { Link, useNavigate } from 'react-router-dom'
import '../css/styleManagement.css'
import { useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa';

export const Management = () => {
    const navigate = useNavigate();
    const admin = sessionStorage.getItem('admin');
    const password = sessionStorage.getItem('password');
    useEffect(() => {
        if(!admin || !password) {
            navigate('/admin-login')
        }
    }, [admin, navigate, password])
    function setAdmin() {
        sessionStorage.clear();
    }
    return (
        <div className="management">
            <Link to={'/admin-management'}><h1>HELLO, ADMIN &hearts;</h1></Link>
            <Link to='/admin-products-management'>
                <div className="admin-management">
                    <FaBoxOpen className="ic"/>
                    <h2>PRODUCTS</h2>
                </div>
            </Link>
            <Link to='/admin-login'>
                <div className="admin-management" onClick={setAdmin}>
                    <AiOutlineLogout className="ic"/>
                    <h2>LOGOUT</h2>
                </div>
            </Link>
        </div>
    )
}
