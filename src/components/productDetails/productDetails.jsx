import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { CartContext } from "../../context/CartContext";

export default function ProductDetails() {
  let { id, catagory } = useParams();
  const { addProductToCart } = useContext(CartContext); 
  const [productDetails, setProductDetails] = useState(null);
  const [relateProducts, setRelateProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false); // New state for cart button loading

  function getProductsDetails(id) {
    setIsLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setError(null);
      })
      .catch((error) => {
        setError(error?.response?.data?.message || 'An error occurred');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  function getRelateProducts(catagory) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        let allProducts = data.data;
        let related = allProducts.filter(
          (product) => product.category.name === catagory
        );
        setRelateProducts(related);
      })
      .catch(() => {
        setError('Failed to fetch related products');
      });
  }

  function handleAddToCart() {
    if (productDetails) {
      setIsAddingToCart(true); // Set loading state to true
      addProductToCart(productDetails.id)
        .then(() => {
          toast.success('Product added to cart successfully!', {
            duration: 2000,
            position: 'top-right',
            style: {
              animation: 'fadeOut 0.5s ease-in-out',
            },
          });
        })
        .catch(() => {
          toast.error('Failed to add product to cart');
        })
        .finally(() => {
          setIsAddingToCart(false); // Set loading state to false
        });
    } else {
      toast.error('No product details available to add to cart');
    }
  }

  function handleViewProduct(product) {
    setProductDetails(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    getProductsDetails(id);
    getRelateProducts(catagory);
  }, [id, catagory]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin dark:border-green-600"></div>
      </div>
    );
  }

  return (
    <section className="py-20 m-10 dark:bg-gray-900 dark:text-gray-200">
      <div className="container mx-auto">
        {error ? (
          <div className="alert alert-error text-center dark:bg-red-800 dark:text-red-300">{error}</div>
        ) : (
          <>
            {/* Product Details Section */}
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/3 mb-6">
                {productDetails && (
                  productDetails.images.length > 1 ? (
                    <Slider {...sliderSettings}>
                      {productDetails.images.map((src, index) => (
                        <div key={index}>
                          <img
                            className="w-full rounded-lg shadow-md"
                            src={src}
                            alt={productDetails.title}
                          />
                        </div>
                      ))}
                    </Slider>
                  ) : (
                    <img
                      className="w-full rounded-lg shadow-md"
                      src={productDetails.images[0]}
                      alt={productDetails.title}
                    />
                  )
                )}
              </div>
              <div className="w-full md:w-2/3 p-6">
                <h1 className="text-3xl font-semibold text-gray-900 mb-4 dark:text-gray-100">
                  {productDetails?.title}
                </h1>
                <p className="text-gray-700 font-light leading-relaxed mb-4 dark:text-gray-400">
                  {productDetails?.description}
                </p>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {productDetails?.price} EGP
                  </span>
                  <span className="flex items-center text-yellow-500 dark:text-yellow-400">
                    {productDetails?.ratingsAverage}
                    <i className="fas fa-star ml-2"></i>
                  </span>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out relative dark:bg-green-600 dark:hover:bg-green-700"
                >
                  {isAddingToCart ? (
                    <div className="absolute inset-0 flex justify-center items-center">
                      <div className="w-5 h-5 border-4 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6 text-green-500 dark:text-green-400">Related Products</h2>
              <div className="flex flex-wrap">
                {relateProducts.map((product) => (
                  <div key={product.id} className="w-full md:w-1/4 p-4">
                    <div className="border rounded-lg overflow-hidden shadow-md dark:border-gray-700">
                      <img
                        className="w-full h-48 object-cover"
                        src={product.imageCover}
                        alt={product.title}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                          {product.title}
                        </h3>
                        <p className="text-green-600 font-bold dark:text-green-400">{product.price} EGP</p>
                        <p className="text-yellow-500 flex items-center dark:text-yellow-400">
                          {product.ratingsAverage}
                          <i className="fas fa-star ml-2"></i>
                        </p>
                        <button
                          className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full dark:bg-green-600 dark:hover:bg-green-700"
                          onClick={() => handleViewProduct(product)}
                        >
                          View Product
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
