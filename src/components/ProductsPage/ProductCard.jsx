import React from "react";

function ProductCard({ product }) {
  const uploadsUrl = import.meta.env.VITE_UPLOADS_URL;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const cleanPath = imagePath.replace(/^uploads\//, "");
    return `${uploadsUrl}/${cleanPath}`;
  };

  return (
    <div className="group hover:scale-105 shadow-sm hover:shadow-md transition-transform duration-200 ease-in-out h-full flex flex-col">
        <div className="h-[240px] sm:h-[300px]">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="mt-3 pb-3 px-3 flex flex-1 justify-between text-sm">
          <div className="flex flex-col flex-1">
            <h2 className="font-semibold">
              {product.name}
            </h2>

            <p className="mt-1.5 text-sm text-pretty line-clamp-3">
              {product.description}
            </p>
          </div>

          <p className="ml-4 whitespace-nowrap">LE {product.price}</p>
        </div>
    </div>
  );
}

export default ProductCard;
