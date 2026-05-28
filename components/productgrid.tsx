import ProductCard from "./productCard"

type Product = {
  id: number
  title: string
  price: number
  image: string
}

export default function ProductGrid({
  products
}: {
  products: Product[]
}) {

  return (

    <div className="grid grid-cols-5 gap-4">

      {products.map(product => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  )
}