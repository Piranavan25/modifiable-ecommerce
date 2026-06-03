"use client"

import { useEffect, useState } from "react"
import { api } from "@/data/api"
import ProductGrid from "./productgrid"

type Product = {
  id: number
  title: string
  price: number
  image: string
}

type JustForYouProps = {
  title?: string
  viewAllText?: string
  products?: Product[]
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    titleSize?: string
    viewAllColor?: string
  }
}

export default function JustForYouSection({
  title = "Just For You",
  viewAllText = "View All",
  products,
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-10",
    titleSize: "text-2xl",
    viewAllColor: "text-orange-500"
  }
}: JustForYouProps) {
  const [data, setData] = useState<Product[]>(products || [])
  const [loading, setLoading] = useState(!products)

  useEffect(() => {
    if (!products) {
      api.getProducts().then(res => {
        if (res) setData(res)
        setLoading(false)
      })
    }
  }, [products])

  if (loading) {
    return (
      <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
        <div className="h-8 w-48 bg-slate-200 animate-pulse mb-6 rounded" />
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className={`${styles.titleSize} font-bold`}>
          {title}
        </h2>

        <button className={`${styles.viewAllColor} font-medium`}>
          {viewAllText}
        </button>
      </div>

      {/* PRODUCT GRID */}
      <ProductGrid
        products={data}
      />
    </section>
  )
}