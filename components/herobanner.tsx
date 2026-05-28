"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import { banners } from "@/data/banners"

type BannerItem ={
    id: string | number
    title:String
    subtitle? : string
    button? : string
    image: string
}

type Bannerprops ={
    banner?:BannerItem[]
    autoplay?: boolean
    delay?: number
    clickable? :boolean
    loop?:boolean
    showPagination?:boolean
    showButton?:boolean
    showSubtitle?:boolean
    showBadge?:boolean

    varieant?: "default" | "minimal"  | "modern"

    imagePosition? : "left"| "right"

    rounded? : boolean

}
export default function HeroBanner({
    banner= banners,
    autoplay= true,
    delay = 3000,
    clickable = true,
    loop = true,
    showPagination = true,
    showButton = true,
    showSubtitle = true,
    showBadge = true,
    imagePosition = "right",
    rounded = true
}) {

  return (

    <section className="bg-orange-50">

      <div
        className="
          max-w-350
          mx-auto
          px-6
          py-6
        "
      >

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={ autoplay? {delay} : false}
          pagination={showPagination ? {clickable :true} :false}
          loop={true}
        >

          {banners.map((banner) => (

            <SwiperSlide key={banner.id}>

              <div
                className="
                  grid
                  grid-cols-2
                  gap-10
                  items-center
                  bg-white
                  rounded-3xl
                  overflow-hidden
                  p-10
                "
              >

                {/* LEFT */}
                <div>

                  <p
                    className="
                      text-orange-500
                      font-semibold
                      mb-3
                    "
                  >
                    SPECIAL OFFER
                  </p>

                  <h1
                    className="
                      text-5xl
                      font-bold
                      leading-tight
                      mb-5
                    "
                  >
                    {banner.title}
                  </h1>

                  <p
                    className="
                      text-slate-600
                      text-lg
                      mb-8
                    "
                  >
                    {banner.subtitle}
                  </p>

                  <button
                    className="
                      bg-orange-500
                      text-white
                      px-8
                      py-4
                      rounded-xl
                    "
                  >
                    {banner.button}
                  </button>

                </div>

                {/* RIGHT */}
                <div>

                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="
                      w-full
                      h-112.5
                      object-cover
                      rounded-2xl
                    "
                  />

                </div>

              </div>

            </SwiperSlide>

          ))}

        </Swiper>

      </div>

    </section>
  )
}