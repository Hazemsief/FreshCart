import React, { useEffect, useState } from "react";
import axios from "axios";
import BrandDetails from "../BrandDetails/BrandDetails";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [isModeOpen, setIsModeOpen] = useState(false);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(data.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setError(error?.response?.data?.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleBrandDetails = (brand) => {
    setSelectedBrand(brand);
    setIsModeOpen(true);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-green-400 mb-12">
          All Brands
        </h1>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-t-4 border-green-400 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center text-xl text-red-500 bg-red-100 p-4 rounded-md shadow-md">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {brands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => handleBrandDetails(brand)}
                className="text-center shadow-lg p-8 bg-white rounded-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 hover:border-green-600 dark:bg-gray-800 dark:text-white"
              >
                <img
                  className="w-20 h-20 mx-auto mb-6"
                  src={brand.image}
                  alt={brand.name}
                />
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-300">
                  {brand.name}
                </h2>
              </div>
            ))}
          </div>
        )}
      </div>

      <BrandDetails isOpen={isModeOpen} onClose={() => setIsModeOpen(false)}>
        {selectedBrand && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {selectedBrand.name}
            </h2>
            <img
              className="w-full mb-4"
              src={selectedBrand.image}
              alt={selectedBrand.name}
            />
            <p className="text-gray-800 dark:text-gray-300">
              Additional brand details go here...
            </p>
          </div>
        )}
      </BrandDetails>
    </section>
  );
}
