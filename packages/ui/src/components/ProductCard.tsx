import React from "react";
import { cn } from "../utils/cn";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: {
    amount: number;
    currency: string;
  };
  image?: {
    url: string;
    alt: string;
  };
  rating?: number;
  reviewCount?: number;
  isAvailable?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  image,
  rating,
  reviewCount,
  isAvailable = true,
  onClick,
  className,
}) => {
  const formatPrice = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md",
        !isAvailable && "opacity-60",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        {image ? (
          <img
            src={image.url}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm font-medium">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {name}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {description}
          </p>
        )}

        {/* Rating */}
        {rating !== undefined && (
          <div className="mt-2 flex items-center gap-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= Math.round(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-sm text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(price.amount, price.currency)}
          </span>
          {isAvailable && (
            <button className="px-3 py-1.5 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

ProductCard.displayName = "ProductCard";
