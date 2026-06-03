"use client"

import { useEffect, useState } from "react"
import { api } from "@/data/api"

type Category = {
  id: number
  name: string
  image: string
}

type CategoryMenuProps = {
  categories?: Category[]
  styles?: {
    backgroundColor?: string
    textColor?: string
    hoverBackgroundColor?: string
    hoverTextColor?: string
    width?: string
    borderRadius?: string
    padding?: string
    fontSize?: string
    shadow?: string
  }
}

export default function CategoryMenu({
  categories,
  styles = {
    backgroundColor: "bg-white",
    textColor: "text-slate-700",
    hoverBackgroundColor: "hover:bg-orange-50",
    hoverTextColor: "hover:text-orange-500",
    width: "w-64",
    borderRadius: "rounded-xl",
    padding: "p-4",
    fontSize: "text-sm",
    shadow: "shadow-sm"
  }
}: CategoryMenuProps) {
  const [data, setData] = useState<Category[]>(categories || [])
  const [loading, setLoading] = useState(!categories)

  useEffect(() => {
    if (!categories) {
      api.getCategories().then(res => {
        if (res) setData(res)
        setLoading(false)
      })
    }
  }, [categories])

  if (loading) {
    return (
      <div className={`${styles.width} ${styles.backgroundColor} ${styles.borderRadius} ${styles.padding} ${styles.shadow} hidden lg:block`}>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="h-8 bg-slate-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.width} ${styles.backgroundColor} ${styles.borderRadius} ${styles.padding} ${styles.shadow} hidden lg:block`}>
      <ul className="space-y-1">
        {data.map((cat) => (
          <li 
            key={cat.id}
            className={`
              flex items-center gap-3 px-3 py-2 
              ${styles.borderRadius} 
              ${styles.textColor} 
              ${styles.hoverBackgroundColor} 
              ${styles.hoverTextColor} 
              ${styles.fontSize}
              cursor-pointer transition-colors
            `}
          >
            <img src={cat.image} alt="" className="w-5 h-5 object-contain" />
            <span className="truncate">{cat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

