import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {

  const myValidationSchema = Yup.object().shape({
    
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      
    },
    validationSchema: myValidationSchema,
    onSubmit: handelLogin,
  });


  const {setaccessToken} = useContext(AuthContext);
  const navigate = useNavigate();
  const [apiError, setapiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  async function handelLogin(FormValues) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, FormValues);
      console.log(data);
      if(data.message === "success"){
        setIsLoading(false);
        setaccessToken(data.token);
        localStorage.setItem('accessToken' , data.token)
        navigate("/"); 
      }
    } catch (apiResponse) {
      setIsLoading(false);
      setapiError(apiResponse?.response?.data?.message);
      // console.log(apiResponse?.response?.data?.message);
    }
  }

  const handleInputChange = (e) => {
    formik.handleChange(e);
    if (formik.touched[e.target.name]) {
      formik.setFieldTouched(e.target.name, false, false);
      formik.setFieldError(e.target.name, "");
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto p-2">
        
        {apiError ? <div className=" text-xl p-3 text-red-500 rounded-lg bg-gray-700">
          {apiError}
        </div> : null}

        <h1 className="text-slate-950 text-3xl p-2 mb-2 font-semibold">
          Login Now
        </h1>

        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.email}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">{formik.errors.email}</div>
        ) : null}

        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.password}
            onChange={handleInputChange}
            onBlur={formik.handleBlur}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div className=" p-3 text-red-500 rounded-lg bg-gray-700">{formik.errors.password}</div>
        ) : null}
        

        <div className='flex justify-between px-4'>
          
        <div>
        <h2 className='text-black font-semibold hover:text-green-500'> <Link to='/ForgetPassword'> Forget Your password </Link></h2>
        <p className='text-bold'>Did you have an account ?<span className='font-bold'> <Link to='/Register'> SignUp </Link></span></p>
        </div>
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
          {IsLoading? <i className='fas fa-spinner fa-spin'></i> : 'Login'
          }
        </button>
        </div>

        <nav></nav>
      </form>
    </>
  );
}
