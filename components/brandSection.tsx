"use client"

import { useEffect, useState } from "react"
import { api } from "@/data/api"

type Brand = {
  id: number
  name: string
  image: string
  link?: string
}

type BrandSectionProps = {
  title?: string
  brands?: Brand[]
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    titleSize?: string
    gridCols?: string
    itemBackgroundColor?: string
    itemHoverShadow?: string
    iconSize?: string
  }
}

export default function BrandSection({
  title,
  brands,
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-10",
    titleSize: "text-2xl",
    gridCols: "grid-cols-3 md:grid-cols-6",
    itemBackgroundColor: "bg-white",
    itemHoverShadow: "hover:shadow-md",
    iconSize: "h-12"
  }
}: BrandSectionProps) {
  const [data, setData] = useState<Brand[]>(brands || [])
  const [loading, setLoading] = useState(!brands)

  useEffect(() => {
    if (!brands) {
      api.getBrands().then(res => {
        if (res) setData(res)
        setLoading(false)
      })
    }
  }, [brands])

  if (loading) {
    return (
      <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
        <div className="h-8 w-48 bg-slate-200 animate-pulse mb-6 rounded" />
        <div className={`grid ${styles.gridCols} gap-4`}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-24 bg-slate-200 animate-pulse rounded-xl" />
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      {title && (
        <h2 className={`${styles.titleSize} font-bold mb-6`}>
          {title}
        </h2>
      )}

      <div className={`grid ${styles.gridCols} gap-4`}>
        {data.map((brand) => (
          <a
            key={brand.id}
            href={brand.link || "#"}
            className={`
              flex
              items-center
              justify-center
              p-6
              border
              rounded-xl
              ${styles.itemHoverShadow}
              ${styles.itemBackgroundColor}
              transition
              cursor-pointer
            `}
          >
            <img
              src={brand.image}
              alt={brand.name}
              className={`${styles.iconSize} object-contain`}
            />
          </a>
        ))}
      </div>
    </section>
  )
}

