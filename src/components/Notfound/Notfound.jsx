import React, { useEffect, useState } from "react";
import Style from "./Notfound.module.css";
import error from "../../assets/error.png";
import { useNavigate } from "react-router-dom";

export default function Notfound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <img
          className="w-[200px] h-[200px] object-cover mb-4"
          src={error}
          alt="Error Page"
        />
        <button
          onClick={handleGoHome}
          className="bg-green-700 text-white py-2 px-4 rounded-lg hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Go to Home
        </button>
      </div>
    </>
  );
}
