import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

export default function CatagorySlider() {
  const [Categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function getCategories() {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
        setError(null);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || 'An error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 2000,
    cssEase: 'linear',
  };

  return (
    <section className="py-10 m-40">
      <div className="container mx-auto">
      <h1 className='font-semibold text-2xl text-green-500'>See Popular Categories</h1>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : error ? (
          <div className="alert alert-error text-center">{error}</div>
        ) : (
          <Slider {...sliderSettings}>
            {Categories.map((category) => (
              <div key={category.id} className="flex flex-col items-center w-64 h-80 mx-2 p-5"> 
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={category.image}
                  alt={category.name}
                />
                <h3 className="mt-4 text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
}
