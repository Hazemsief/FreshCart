import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const subCategoriesRef = useRef(null); // Ref for subcategories section

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
        setCategories(data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchSubCategories = async () => {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories?category=${selectedCategory}`);
          setSubCategories(data.data);
          setError(null);

          // Scroll to subcategories section after data is set
          setTimeout(() => {
            if (subCategoriesRef.current) {
              subCategoriesRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }, 0);
        } catch (error) {
          console.error(error);
          setError(error?.response?.data?.message || 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };

      fetchSubCategories();
    }
  }, [selectedCategory]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-400 mb-12 dark:text-green-300">All Categories</h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin dark:border-green-300"></div>
          </div>
        ) : error ? (
          <div className="text-center text-xl text-red-500 bg-red-100 p-4 rounded-md shadow-md dark:bg-red-800 dark:text-red-300">
            {error}
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  className="text-center shadow-md p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer dark:bg-gray-800 dark:text-gray-200"
                  onClick={() => setSelectedCategory(category._id)}
                >
                  <img className="w-24 h-24 mx-auto mb-4 rounded-lg" src={category.image} alt={category.name} />
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">{category.name}</h2>
                </div>
              ))}
            </div>
            {selectedCategory && (
              <div ref={subCategoriesRef} className="mt-12">
                <h2 className="text-3xl font-bold text-center text-green-400 mb-6 dark:text-green-300">Subcategories</h2>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="w-12 h-12 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin dark:border-green-300"></div>
                  </div>
                ) : error ? (
                  <div className="text-center text-xl text-red-500 bg-red-100 p-4 rounded-md shadow-md dark:bg-red-800 dark:text-red-300">
                    {error}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {subCategories.map((subCategory) => (
                      <div key={subCategory._id} className="text-center shadow-md p-6 bg-white rounded-lg hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-gray-200">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                          {subCategory.name}
                        </h2>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
