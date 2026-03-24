import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-6 flex flex-col h-full animate-pulse">
      <div className="aspect-[4/3] bg-gray-100 rounded-2xl mb-6 shadow-inner" />
      <div className="h-6 bg-gray-100 rounded-lg w-3/4 mb-4" />
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-3 w-3 bg-gray-100 rounded-full" />
        ))}
      </div>
      <div className="mt-auto">
        <div className="h-12 bg-gray-100 rounded-2xl w-full mb-4" />
        <div className="h-12 bg-gray-100 rounded-2xl w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
