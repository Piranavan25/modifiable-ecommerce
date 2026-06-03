import Link from "next/link"

type NavbarProps = {
  logoText?: string
  showSearch?: boolean
  showCart?: boolean
  showProfile?: boolean
  styles?: {
    backgroundColor?: string
    textColor?: string
    logoColor?: string
    searchBorderColor?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    fontSize?: string
    containerMaxWidth?: string
    paddingY?: string
    shadow?: string
  }
}

export default function Navbar({
  logoText = "ModuShop",
  showSearch = true,
  showCart = true,
  showProfile = true,
  styles = {
    backgroundColor: "bg-white",
    textColor: "text-slate-800",
    logoColor: "text-orange-500",
    searchBorderColor: "focus:border-orange-500",
    buttonBackgroundColor: "bg-orange-500",
    buttonTextColor: "text-white",
    fontSize: "text-base",
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-4",
    shadow: "shadow-sm"
  }
}: NavbarProps) {

  return (
    <nav className={`${styles.backgroundColor} ${styles.shadow} border-b ${styles.fontSize} ${styles.textColor}`}>
      <div className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
        <div className="flex items-center justify-between gap-6">
          
          {/* LOGO */}
          <Link href="/" className={`text-3xl font-bold ${styles.logoColor}`}>
            {logoText}
          </Link>

          {/* SEARCH */}
          <div className={`flex-1 ${!showSearch ? 'hidden' : ''}`}>
            <input
              type="text"
              placeholder="Search products..."
              className={`
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                ${styles.searchBorderColor}
              `}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <button
                className={`
                  ${styles.buttonBackgroundColor}
                  ${styles.buttonTextColor}
                  px-5
                  py-3
                  rounded-xl
                  ${!showCart ? 'hidden' : ''}
                `}
              >
                Cart
              </button>
            </Link>

            <button
              className={`
                ${styles.buttonBackgroundColor}
                ${styles.buttonTextColor}
                border
                px-5
                py-3
                rounded-xl
                ${!showProfile ? 'hidden' : ''}
              `}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}