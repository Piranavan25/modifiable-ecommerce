"use client"

import { products } from "@/data/products"

type CartProps = {
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    cardBackgroundColor?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
  }
}

export default function Cart({
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-10",
    cardBackgroundColor: "bg-white",
    buttonBackgroundColor: "bg-orange-500",
    buttonTextColor: "text-white"
  }
}: CartProps) {
  // Mock cart items using some products
  const cartItems = products.slice(0, 2).map(p => ({ ...p, quantity: 1 }))

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = 5.00
  const total = subtotal + shipping

  return (
    <div className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      <h1 className="text-3xl font-bold mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ITEMS LIST */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div key={item.id} className={`${styles.cardBackgroundColor} p-6 rounded-2xl shadow-sm flex gap-6 items-center`}>
              <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-xl" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-2">Color: Black, Size: XL</p>
                <p className="text-orange-500 font-bold">${item.price}</p>
              </div>
              <div className="flex items-center border rounded-lg">
                <button className="px-3 py-1 hover:bg-slate-50">-</button>
                <span className="px-4 py-1 border-x">{item.quantity}</span>
                <button className="px-3 py-1 hover:bg-slate-50">+</button>
              </div>
              <button className="text-slate-400 hover:text-red-500 transition-colors">
                🗑️
              </button>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="lg:col-span-1">
          <div className={`${styles.cardBackgroundColor} p-8 rounded-2xl shadow-sm space-y-6`}>
            <h2 className="text-xl font-bold border-b pb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg pt-4 border-t">
                <span>Total</span>
                <span className="text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>

            <button className={`w-full ${styles.buttonBackgroundColor} ${styles.buttonTextColor} py-4 rounded-xl font-bold hover:opacity-90 transition-opacity`}>
              Proceed to Checkout
            </button>

            <div className="text-center">
              <p className="text-sm text-slate-500">Apply Voucher Code</p>
              <div className="flex gap-2 mt-2">
                <input 
                  type="text" 
                  placeholder="Voucher Code" 
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500"
                />
                <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-bold">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
