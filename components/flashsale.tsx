import { products } from "@/data/products"
import ProductCard from "./productCard"

export default function FlashSaleSection() {

  return (

    <section className="max-w-350 mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">

          <h2 className="text-2xl font-bold text-red-500">
            🔥 Flash Sale
          </h2>

          {/* SIMPLE TIMER (STATIC FOR NOW) */}
          <div className="text-sm text-slate-600 bg-slate-100 px-3 py-1 rounded-lg">
            Ends in: 12h 45m 10s
          </div>

        </div>

        <button className="text-red-500 font-medium">
          View All
        </button>

      </div>

      {/* HORIZONTAL SCROLL LIST */}
      <div className="flex gap-4 overflow-x-auto pb-4">

        {products.map((product) => (

          <div
            key={product.id}
            className="min-w-55"
          >

            <ProductCard product={product} />

          </div>

        ))}

      </div>

    </section>
  )
}