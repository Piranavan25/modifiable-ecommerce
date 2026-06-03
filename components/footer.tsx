"use client"

type FooterProps = {
  logoText?: string
  copyrightText?: string
  styles?: {
    backgroundColor?: string
    textColor?: string
    linkColor?: string
    containerMaxWidth?: string
    paddingY?: string
    fontSize?: string
    dividerColor?: string
    logoColor?: string
  }
}

export default function Footer({
  logoText = "ModuShop",
  copyrightText = "© 2026 ModuShop. All rights reserved.",
  styles = {
    backgroundColor: "bg-slate-900",
    textColor: "text-slate-300",
    linkColor: "text-white",
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-12",
    fontSize: "text-sm",
    dividerColor: "border-slate-700",
    logoColor: "text-orange-400"
  }
}: FooterProps) {

  return (
    <footer className={`${styles.backgroundColor} w-full mt-10 ${styles.fontSize}`}>
      <div className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
        {/* GRID - Fix grid columns for responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className={`text-2xl font-bold ${styles.logoColor} mb-4`}>
              {logoText}
            </h2>
            <p className={`${styles.textColor}`}>
              Your AI-powered ecommerce experience.
              Fast, modern, and customizable.
            </p>
          </div>

          {/* CUSTOMER SERVICE */}
          <div>
            <h3 className="font-semibold mb-4">
              Customer Service
            </h3>
            <ul className={`space-y-2 ${styles.textColor}`}>
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Returns</li>
              <li className="hover:text-white cursor-pointer transition-colors">Shipping Info</li>
              <li className="hover:text-white cursor-pointer transition-colors">Track Order</li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-semibold mb-4">
              About
            </h3>
            <ul className={`space-y-2 ${styles.textColor}`}>
              <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition-colors">Terms & Conditions</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-semibold mb-4">
              Contact
            </h3>
            <ul className={`space-y-2 ${styles.textColor}`}>
              <li>Email: support@modushop.com</li>
              <li>Phone: +94 77 123 4567</li>
              <li>Location: Sri Lanka</li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={`border-t ${styles.dividerColor} mt-10 pt-6 text-center text-slate-400`}>
          {copyrightText}
        </div>
      </div>
    </footer>
  )
}