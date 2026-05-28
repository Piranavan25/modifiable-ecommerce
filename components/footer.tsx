export default function Footer() {

  return (

    <footer className="bg-slate-900 text-white mt-10">

      <div className="max-w-350 mx-auto px-6 py-12">

        {/* GRID */}
        <div className="grid grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <h2 className="text-2xl font-bold text-orange-400 mb-4">
              ModuShop
            </h2>

            <p className="text-slate-300 text-sm">
              Your AI-powered ecommerce experience.
              Fast, modern, and customizable.
            </p>

          </div>

          {/* CUSTOMER SERVICE */}
          <div>

            <h3 className="font-semibold mb-4">
              Customer Service
            </h3>

            <ul className="space-y-2 text-sm text-slate-300">

              <li>Help Center</li>
              <li>Returns</li>
              <li>Shipping Info</li>
              <li>Track Order</li>

            </ul>

          </div>

          {/* ABOUT */}
          <div>

            <h3 className="font-semibold mb-4">
              About
            </h3>

            <ul className="space-y-2 text-sm text-slate-300">

              <li>About Us</li>
              <li>Careers</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>

            </ul>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="font-semibold mb-4">
              Contact
            </h3>

            <ul className="space-y-2 text-sm text-slate-300">

              <li>Email: support@modushop.com</li>
              <li>Phone: +94 77 123 4567</li>
              <li>Location: Sri Lanka</li>

            </ul>

          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-sm text-slate-400">

          © 2026 ModuShop. All rights reserved.

        </div>

      </div>

    </footer>
  )
}