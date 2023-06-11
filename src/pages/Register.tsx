import './css/styleRegister.css'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { callAPIUsers, registerUser } from '../redex/slice/userSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../redex/store';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object({
  firstname: yup.string().required("Bạn chưa nhập thông tin!"),
  lastname: yup.string().required("Bạn chưa nhập thông tin!"),
  phone: yup.number().integer()
  .required("Bạn chưa nhập thông tin!")
  .min(10, "Phone cần ít nhất 10 chữ số!").max(11, "Phone chỉ có chiều dài tối đa là 11 chữ số!"),
  email: yup.string().required("Bạn chưa nhập thông tin!").email("Bạn cần nhập đúng định dạng Email!"),
  password: yup.string()
  .required("Bạn chưa nhập thông tin!")
  .min(8, "Password cần ít nhất 8 ký tự!").max(16, "Password chỉ có chiều dài tối đa là 16 ký tự")
  .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/, "Password cần ít nhất 1 ký tự đặc biệt"),
  confirmpassword: yup.string()
  .required("Bạn chưa nhập thông tin!")
  .oneOf([yup.ref('password')], "Confirm Password phải giống với Password"),
}).required();
type FormData = yup.InferType<typeof schema>;

const Register = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  useEffect(() => {
    dispatch(callAPIUsers)
  }, [dispatch]);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  function phoneRegister(e: any) {
    setPhone(e.target.value)
  }
  function emailRegister(e: any) {
    setEmail(e.target.value)
  }
  const [errPhone, setErrPhone] = useState('');
  const [errEmail, setErrEmail] = useState('');
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  const onSubmit = (data: FormData) => {
    const phoneRegistered = users.find((item: any) => item.phone === phone);
    const emailRegistered = users.find((item: any) => item.email === email);
    if(phoneRegistered) {
      setErrPhone('Phone đã được đăng ký, vui lòng nhập Phone mới');
    }else if(emailRegistered) {
      setErrEmail('Email đã được đăng ký, vui lòng nhập Email mới');
    }else {
      dispatch(registerUser(data));
      navigate('/login')
    }
  }
  return (
    <div className="register">
      <form className='form-register' onSubmit={handleSubmit(onSubmit)}>
          <h1>ĐĂNG KÝ</h1>
          <input placeholder='First Name' {...register("firstname")} />
          <p>{errors.firstname?.message}</p>

          <input placeholder='Last Name' {...register("lastname")} />
          <p>{errors.lastname?.message}</p>

          <input placeholder='Phone' {...register("phone", {onChange: phoneRegister})} />
          <p>{errors.phone?.message ? errors.phone?.message : errPhone}</p>

          <input placeholder='Email' {...register("email", {onChange: emailRegister})} />
          <p>{errors.email?.message ? errors.email?.message : errEmail}</p>

          <input type='password' placeholder='Password' {...register("password")} />
          <p>{errors.password?.message}</p>

          <input type='password' placeholder='Confirm Password' {...register("confirmpassword")} />
          <p>{errors.confirmpassword?.message}</p>

          <div className='register-user'>
            <button className='btn-register-user'>REGISTER</button>
          </div>

          <div className='login-formregister'>
            <Link to='/login'> <h3>Login</h3> </Link>
          </div>
      </form>
    </div>
  )
}

export default Register