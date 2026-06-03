"use client"

import { useState } from "react"

type ProductDetailProps = {
  context?: {
    product: {
      id: number
      title: string
      price: number
      image: string
      description?: string
      rating?: number
      reviews_count?: number
      reviewsCount?: number
    }
  }
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    titleSize?: string
    priceColor?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    imageBorderRadius?: string
    cardBackgroundColor?: string
  }
}

export default function ProductDetail({
  context,
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-10",
    titleSize: "text-3xl",
    priceColor: "text-orange-500",
    buttonBackgroundColor: "bg-orange-500",
    buttonTextColor: "text-white",
    imageBorderRadius: "rounded-2xl",
    cardBackgroundColor: "bg-white"
  }
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)

  if (!context?.product) {
    return <div className="p-10 text-center">Product not found</div>
  }

  const { product } = context

  return (
    <div className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 ${styles.cardBackgroundColor} p-8 rounded-3xl shadow-sm`}>
        {/* IMAGE GALLERY */}
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full aspect-square object-cover ${styles.imageBorderRadius}`}
          />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={product.image}
                alt=""
                className={`w-full aspect-square object-cover ${styles.imageBorderRadius} cursor-pointer hover:opacity-80 transition-opacity`}
              />
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <h1 className={`${styles.titleSize} font-bold mb-4`}>
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-yellow-400">
              {"★".repeat(Math.round(product.rating || 4))}
              {"☆".repeat(5 - Math.round(product.rating || 4))}
            </div>
            <span className="text-slate-500 text-sm">
              ({product.reviews_count || product.reviewsCount || 0} Reviews)
            </span>
          </div>

          <p className={`${styles.priceColor} text-4xl font-bold mb-8`}>
            ${product.price}
          </p>

          <p className="text-slate-600 mb-8 leading-relaxed">
            {product.description || "High-quality product with exceptional features. Designed for durability and performance. Perfect for your daily needs."}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center gap-6 mb-8">
            <span className="font-semibold">Quantity:</span>
            <div className="flex items-center border rounded-xl overflow-hidden">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-slate-100 transition-colors"
              >-</button>
              <span className="px-6 py-2 border-x font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-slate-100 transition-colors"
              >+</button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 mt-auto">
            <button className={`flex-1 ${styles.buttonBackgroundColor} ${styles.buttonTextColor} py-4 rounded-xl font-bold hover:opacity-90 transition-opacity`}>
              Buy Now
            </button>
            <button className="flex-1 border-2 border-orange-500 text-orange-500 py-4 rounded-xl font-bold hover:bg-orange-50 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
