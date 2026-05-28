type Product ={
    id:number
    title:string
    price:number
    image:string
}
export default function productCard({
    product
}:{product:Product}){
    return (
        <div className="border rounded-xl p-4 bg-white ">
            <img 
                src={product.image}
                className="w-full h-50 object-cover rounded-lg"
            />

            <h3 className="font-bold mt-3">
                {product.title}
            </h3>

            <p className="text-orange-500">
                ${product.price}
            </p>

        </div>
    )

}