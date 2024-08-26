import React, { useState } from 'react';

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='container max-w-7xl mx-auto p-10'>
                <h1 className='text-2xl font-semibold mb-6 text-center'>Please enter your verification code</h1>
                <input className='w-full mb-6 p-2 border border-gray-300 rounded-md' type="email" placeholder="Enter your Email" />

                <button 
                    onClick={handleClick}
                    className="relative text-green-600 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 border border-green-600 dark:border-green-500 dark:text-slate-950"
                >
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-4 border-t-4 border-green-600 border-solid rounded-full animate-spin"></div>
                        </div>
                    ) : 
                    (
                        'Verify'
                    )}
                </button>
                
                {loading && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                        <div className="w-16 h-16 border-4 border-t-4 border-green-600 border-solid rounded-full animate-spin"></div>
                    </div>
                )}
            </div>
        </div>
    );
}
