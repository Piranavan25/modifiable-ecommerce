"use client"

import cartLayout from "@/configs/base/cartLayout.json"
import { renderNode } from "@/layouts/renderNode"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-100">
      {renderNode(cartLayout)}
    </div>
  )
}
