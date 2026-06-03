"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { api } from "@/data/api"
import productDetailLayout from "@/configs/base/productDetailLayout.json"
import { renderNode } from "@/layouts/renderNode"

export default function ProductPage() {
  const params = useParams()
  const id = params.id
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) {
      api.getProduct(id as string).then(res => {
        setProduct(res)
        setLoading(false)
      })
    }
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {renderNode(productDetailLayout, { product })}
    </div>
  )
}

