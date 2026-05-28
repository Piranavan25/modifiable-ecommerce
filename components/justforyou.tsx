import ProductGrid from "./productgrid"
import { products } from "@/data/products"

export default function JustForYouSection() {

  return (

    <section className="max-w-350 mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold">
          Just For You
        </h2>

        <button className="text-orange-500 font-medium">
          View All
        </button>

      </div>

      {/* PRODUCT GRID */}
      <ProductGrid
        products={products}
      />

    </section>
  )
}