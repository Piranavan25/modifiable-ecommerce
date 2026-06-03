"use client"

import { useEffect, useState } from "react"
import { api } from "@/data/api"
import ProductCard from "./productCard"

type Product = {
  id: number
  title: string
  price: number
  image: string
}

type FlashSaleProps = {
  title?: string
  endTime?: string
  showTimer?: boolean
  viewAllText?: string
  products?: Product[]
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    titleColor?: string
    timerBackground?: string
    timerTextColor?: string
    viewAllColor?: string
    cardWidth?: string
  }
}

export default function FlashSaleSection({
  title = "Flash Sale",
  endTime = "12h 45m 10s",
  showTimer = true,
  viewAllText = "View All",
  products,
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-10",
    titleColor: "text-red-500",
    timerBackground: "bg-slate-100",
    timerTextColor: "text-slate-600",
    viewAllColor: "text-red-500",
    cardWidth: "min-w-[220px]"
  }
}: FlashSaleProps) {
  const [data, setData] = useState<Product[]>(products || [])
  const [loading, setLoading] = useState(!products)

  useEffect(() => {
    if (!products) {
      api.getProducts().then(res => {
        if (res) setData(res.slice(0, 6)) // Just show a few for flash sale
        setLoading(false)
      })
    }
  }, [products])

  if (loading) {
    return (
      <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
        <div className="h-8 w-48 bg-slate-200 animate-pulse mb-6 rounded" />
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className={`${styles.cardWidth} h-64 bg-slate-200 animate-pulse rounded-xl`} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className={`text-2xl font-bold ${styles.titleColor}`}>
            🔥 {title}
          </h2>

          {/* TIMER */}
          {showTimer && (
            <div className={`text-sm ${styles.timerTextColor} ${styles.timerBackground} px-3 py-1 rounded-lg`}>
              Ends in: {endTime}
            </div>
          )}
        </div>

        <button className={`${styles.viewAllColor} font-medium`}>
          {viewAllText}
        </button>
      </div>

      {/* HORIZONTAL SCROLL LIST */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {data.map((product) => (
          <div
            key={product.id}
            className={styles.cardWidth}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  )
}