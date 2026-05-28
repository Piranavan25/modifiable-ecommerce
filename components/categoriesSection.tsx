import { categories } from "@/data/categories"

export default function CategoriesSection() {

  return (

    <section className="max-w-350 mx-auto px-6 py-10">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-6">
        Categories
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-5 gap-6">

        {categories.map((cat) => (

          <div
            key={cat.id}
            className="
              flex
              flex-col
              items-center
              justify-center
              p-4
              border
              rounded-xl
              hover:shadow-md
              transition
              cursor-pointer
              bg-white
            "
          >

            {/* ICON */}
            <img
              src={cat.image}
              className="w-14 h-14 mb-3"
            />

            {/* NAME */}
            <p className="text-sm font-medium text-center">
              {cat.name}
            </p>

          </div>

        ))}

      </div>

    </section>
  )
}