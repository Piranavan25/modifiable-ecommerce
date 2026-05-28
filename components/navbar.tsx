
type navbarProps ={
  showSearch?: boolean
  showCart?: boolean
  showProfile?: boolean
}


export default function Navbar({
  showSearch = true,
  showCart = true,
  showProfile = true
}: navbarProps) {

  return (

    <nav className="bg-white shadow-sm border-b">

      <div className="max-w-350 mx-auto px-6 py-4">

        <div className="flex items-center justify-between gap-6">

          {/* LOGO */}
          <div className="text-3xl font-bold text-orange-500">

            ModuShop

          </div>

          {/* SEARCH */}
          <div className="flex-1">

            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full
                border
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-orange-500
                ${!showSearch ? 'hidden' : ''}
              "
            />

          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">

            <button
              className="
                bg-orange-500
                text-white
                px-5
                py-3
                rounded-xl
                ${!showCart ? 'hidden' : ''}
              "
            >
              Cart
            </button>

            <button
              className={`
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