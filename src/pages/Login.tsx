import '../pages/css/styleLogin.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redex/store';
import { useEffect, useState } from 'react';
import { callAPIUsers } from '../redex/slice/userSlice';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const schema = yup.object({
  phone: yup.string().required('Bạn chưa nhập Phone!'),
  password: yup.string().required('Ban chưa nhập Password!'),
}).required();
type FormData = yup.InferType<typeof schema>;

const Login = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callAPIUsers)
  }, [dispatch])

  const [phonelogin, setPhoneLogin] = useState("");
  const [passlogin, setPassLogin] = useState("");
  const [notification, setNotification] = useState('');
  const navigate =useNavigate();
  function value_phonelogin(e: any) {
    setPhoneLogin(e.target.value)
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
    const userlogin = users.find((item : any) => item.phone == phonelogin && item.password == passlogin);
    if(userlogin) {
      navigate('/')
    }
    else {
      setNotification("Tài khoản hoặc mật khẩu không chính xác")
    }
  }

  return (
    <div className='login'>
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1>LOGIN</h1>
        <input placeholder='Phone' {...register("phone", {onChange: value_phonelogin})} />
        <p>{errors.phone?.message ? errors.phone?.message : notification}</p>
          
        <div className='pass'>
          <input type={type} placeholder='Password' {...register("password", {onChange: value_passlogin})} />
          <div onClick={handleEye} className='eye' style={{color: "white"}}>
            {type == 'password' ? <AiFillEyeInvisible className="ic-eye"/> : <AiFillEye className="ic-eye"/> }
          </div>
          <p>{errors.password?.message ? errors.password?.message : notification}</p>
        </div>
        
        <div className='login-user'>
          <button className='btn-login-user'>LOGIN</button>
        </div>
      
        <div className='register-formlogin'>
          <Link to='/register'> <h3>Register</h3> </Link>
        </div>
      </form>
    </div>
  );
}

export default Login