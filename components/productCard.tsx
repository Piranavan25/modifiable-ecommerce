import Link from "next/link"

type Product = {
  id: number
  title: string
  price: number
  image: string
}

type ProductCardProps = {
  product: Product
  styles?: {
    backgroundColor?: string
    titleColor?: string
    priceColor?: string
    borderRadius?: string
    imageHeight?: string
    padding?: string
    shadow?: string
  }
}

export default function ProductCard({
  product,
  styles = {
    backgroundColor: "bg-white",
    titleColor: "text-slate-900",
    priceColor: "text-orange-500",
    borderRadius: "rounded-xl",
    imageHeight: "h-48",
    padding: "p-4",
    shadow: "hover:shadow-lg transition-shadow"
  }
}: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="block h-full">
      <div className={`border h-full ${styles.borderRadius} ${styles.padding} ${styles.backgroundColor} ${styles.shadow}`}>
        <img
          src={product.image}
          alt={product.title}
          className={`w-full ${styles.imageHeight} object-cover rounded-lg`}
        />

        <h3 className={`font-bold mt-3 ${styles.titleColor} truncate`}>
          {product.title}
        </h3>

        <p className={`font-semibold ${styles.priceColor}`}>
          ${product.price}
        </p>
      </div>
    </Link>
  )
}