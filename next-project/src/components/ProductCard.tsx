'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  category?: string;
  specs?: string[];
  buttonText?: string;
  onButtonClick?: () => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  emoji?: string;
  showAddToCart?: boolean;
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  image,
  category,
  specs = [],
  buttonText = "View Details",
  onButtonClick,
  buttonVariant = "default",
  emoji,
  showAddToCart = true
}: ProductCardProps) {
  const { addToCart } = useCart();

  // Update to use BDT currency format
  const formatPrice = (value: number) => {
    return `BDT ${value.toLocaleString()}`;
  };
  
  const formattedPrice = formatPrice(price);
  const formattedOriginalPrice = originalPrice ? formatPrice(originalPrice) : null;

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  
  const handleButtonClick = (e: React.MouseEvent) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name: title,
      price,
      image,
      emoji: emoji || '',
      category
    });
  };

  // Create the product detail URL
  const productUrl = `/products/${category?.toLowerCase() || 'all'}/${id}`;

  const cardContent = (
    <div className="relative p-4 bg-white flex-grow flex flex-col">
      {discount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
          {discount}% OFF
        </div>
      )}
      
      <div className="h-40 relative mb-4 mx-auto">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : emoji ? (
          <div className="flex items-center justify-center h-full w-full">
            <span className="text-5xl">{emoji}</span>
          </div>
        ) : (
          <Image
            src="/next.svg"
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      
      {category && (
        <div className="text-xs text-neutral-500 mb-1">{category}</div>
      )}
      
      <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">{title}</h3>
      
      <div className="mt-auto">
        {specs && specs.length > 0 && (
          <ul className="text-xs text-gray-600 mb-2 space-y-1">
            {specs.slice(0, 4).map((spec, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-1">•</span>
                <span className="line-clamp-1">{spec}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-bold text-lg">{formattedPrice}</span>
          {formattedOriginalPrice && (
            <span className="text-neutral-500 line-through text-sm">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>
      
      <div className={`grid ${showAddToCart ? 'grid-cols-2 gap-2' : 'grid-cols-1'}`}>
        <div className="w-full">
          <Button 
            variant={buttonVariant} 
            className="w-full"
            onClick={handleButtonClick}
          >
            {buttonText}
          </Button>
        </div>
        
        {showAddToCart && (
          <div onClick={(e) => e.stopPropagation()}>
            <Button 
              variant="outline" 
              className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Card className="overflow-hidden border border-neutral-200 hover:border-blue-400 hover:shadow-md transition-all h-full flex flex-col cursor-pointer">
      {onButtonClick ? (
        <div onClick={handleButtonClick}>{cardContent}</div>
      ) : (
        <Link href={productUrl} className="h-full">
          {cardContent}
        </Link>
      )}
    </Card>
  );
}