import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AuthContext } from '../../context/AuthContext';

export default function Register() {

  const myValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name min length is 3")
      .max(35, "Name max length is 35")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(
        /^(010|011|012|015)\d{8}$/,
        "Phone must be a valid Egyptian number"
      )
      .required("Phone is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#]).+$/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and confirmation password must be identical")
      .required("Confirmation password is required"),
  });

  const navigate = useNavigate();
  const { setaccessToken } = useContext(AuthContext);
  const [apiError, setapiError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  async function handelRegister(FormValues) {
    setIsLoading(true);
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, FormValues);
      console.log(data);
      if (data.message === "success") {
        setIsLoading(false);
        setaccessToken(data.token);
        navigate("/"); 
      } else {
        setIsLoading(false);
        setapiError(data.message);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setapiError(error.response.data.message);
      } else {
        setapiError("Network Error");
      }
    }
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: myValidationSchema,
    onSubmit: handelRegister,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto p-2">
        
        {apiError && (
          <div className="text-xl p-3 text-red-500 rounded-lg bg-gray-700">
            {apiError}
          </div>
        )}

        <h1 className="text-slate-950 text-3xl p-2 mb-2 font-semibold">
          Register Now
        </h1>

        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">
            {formik.errors.name}
          </div>
        )}

        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
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
        {formik.errors.email && formik.touched.email && (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">
            {formik.errors.email}
          </div>
        )}

        {/* Phone Field */}
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="tel"
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">
            {formik.errors.phone}
          </div>
        )}

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.password}
            onChange={formik.handleChange}
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
        {formik.errors.password && formik.touched.password && (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">
            {formik.errors.password}
          </div>
        )}

        {/* RePassword Field */}
        <div className="relative z-0 w-full mb-5 group p-2">
          <input
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Re-Enter Your Password
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div className="mt-2 mb-4 p-3 text-red-500 rounded-lg bg-gray-700">
            {formik.errors.rePassword}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 text-sm font-bold tracking-wide text-white bg-green-500 hover:bg-green-600 focus:bg-green-600 focus:outline-none focus:ring-0 focus:ring-green-300 focus:ring-opacity-50 dark:focus:ring-green-900"
        >
          {IsLoading ? <i className="fas fa-spinner fa-spin"></i> : "Register"}
        </button>
      </form>
    </>
  );
}
