import '../css/styleAdminLogin.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { RootState } from '../../redex/store';
import { callAPIUsers } from '../../redex/slice/userSlice';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';


const schema = yup.object({
    email: yup.string().required('Bạn chưa nhập Email!').email('Bạn cần nhập đúng định dạng Email'),
    password: yup.string().required('Ban chưa nhập Password!'),
  }).required();
  type FormData = yup.InferType<typeof schema>;

const AdminLogin = () => {
    const users = useSelector((state: RootState) => state.user.users);
    
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(callAPIUsers)
    }, [dispatch])
  
    const [emaillogin, setEmailLogin] = useState("");
    const [passlogin, setPassLogin] = useState("");
    const [notification, setNotification] = useState("");
    const navigate =useNavigate();
    function value_emaillogin(e: any) {
      setEmailLogin(e.target.value)
    }
    function value_passlogin(e: any) {
      setPassLogin(e.target.value)
    }

    const [type, setType] = useState('password');
    function handleEye() {
      if(type === 'password') {
        setType('text')
        console.log(type);
        
      } else {
        setType('password')
        console.log(type);
      }
      
    }
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = () => {
        const adminlogin = users.find((item : any) => emaillogin == "admin@gmail.com" && item.password == passlogin);      
        if(adminlogin) {
          navigate('/admin-management');
          sessionStorage.setItem('admin', emaillogin);
          sessionStorage.setItem('password', passlogin);
        }
        else {
          setNotification("Tài khoản hoặc mật khẩu không chính xác ?")
        }
    }
    return (
        <div>
            <div className='login'>
                <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                  <h1>LOGIN</h1>
                  <input placeholder='Email' {...register("email", {onChange: value_emaillogin})} />
                  <p>{errors.email?.message ? errors.email?.message : notification}</p>
                  
                  <div className='pass'>
                    <input type={type} placeholder='Password' {...register("password", {onChange: value_passlogin})} />
                    <div onClick={handleEye} className='eye' style={{color: "white"}}>
                      {type == 'password' ? <AiFillEyeInvisible className="ic-eye"/> : <AiFillEye className="ic-eye"/> }
                    </div>
                  </div>
                  <p>{errors.password?.message ? errors.password?.message : notification}</p>
                  
                  <div className='login-admin'>
                      <button className='btn-login-admin'>LOGIN</button>
                  </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin