"use client"

import { useEffect, useState, useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"

import { api } from "@/data/api"

type BannerItem = {
  id: string | number
  title: string
  subtitle?: string
  button?: string
  image: string
}

type HeroBannerProps = {
  banner?: BannerItem[]
  autoplay?: boolean
  delay?: number
  loop?: boolean
  showPagination?: boolean
  showButton?: boolean
  showSubtitle?: boolean
  showBadge?: boolean
  imagePosition?: "left" | "right"
  rounded?: boolean
  styles?: {
    sectionBackground?: string
    cardBackground?: string
    badgeTextColor?: string
    titleTextColor?: string
    subtitleTextColor?: string
    buttonBackgroundColor?: string
    buttonTextColor?: string
    containerMaxWidth?: string
    paddingY?: string
    titleSize?: string
    subtitleSize?: string
  }
}

const DEFAULT_STYLES = {
  sectionBackground: "bg-orange-50",
  cardBackground: "bg-white",
  badgeTextColor: "text-orange-500",
  titleTextColor: "text-slate-900",
  subtitleTextColor: "text-slate-600",
  buttonBackgroundColor: "bg-orange-500",
  buttonTextColor: "text-white",
  containerMaxWidth: "max-w-7xl",
  paddingY: "py-6",
  titleSize: "text-5xl",
  subtitleSize: "text-lg"
}

export default function HeroBanner({
  banner,
  autoplay = true,
  delay = 3000,
  loop = true,
  showPagination = true,
  showButton = true,
  showSubtitle = true,
  showBadge = true,
  imagePosition = "right",
  rounded = true,
  styles = {}
}: HeroBannerProps) { 

  const [data, setData] = useState<BannerItem[]>(banner || [])
  const [loading, setLoading] = useState(!banner)
  const [swiperKey, setSwiperKey] = useState(0)
  const mergedStyles = { ...DEFAULT_STYLES, ...styles }

  useEffect(() => {
    if (!banner) {
      api.getBanners().then(res => {
        if (res) {
          setData(res)
          // Force Swiper to reinitialize after images load
          setTimeout(() => setSwiperKey(prev => prev + 1), 100)
        }
        setLoading(false)
      })
    }
  }, [banner])

  // Force Swiper update when data changes
  useEffect(() => {
    if (data.length > 0) {
      setSwiperKey(prev => prev + 1)
    }
  }, [data])

  if (loading) {
    return (
      <section className={mergedStyles.sectionBackground}>
        <div className={`mx-auto ${mergedStyles.containerMaxWidth} px-6 ${mergedStyles.paddingY}`}>
          <div className="w-full h-[450px] bg-slate-200 animate-pulse rounded-3xl" />
        </div>
      </section>
    )
  }

  if (!data || data.length === 0) return null

  return (
    <section className={`${mergedStyles.sectionBackground} w-full min-w-0 overflow-hidden`}>
      <div className={`mx-auto ${mergedStyles.containerMaxWidth} px-6 ${mergedStyles.paddingY} w-full min-w-0`}>
        <Swiper
          key={swiperKey}
          modules={[Autoplay, Pagination]}
          autoplay={autoplay ? { delay, disableOnInteraction: false } : false}
          pagination={showPagination ? { clickable: true, dynamicBullets: true } : false}
          loop={loop}
          observer={true}
          observeParents={true}
          updateOnWindowResize={true}
          slidesPerView={1}
          spaceBetween={0}
          onSwiper={(swiper) => {
  // Force update after swiper is initialized with safety guardrails
  setTimeout(() => {
    if (swiper && !swiper.destroyed && typeof swiper.update === 'function') {
      swiper.update()
      swiper.updateSize()
    }
  }, 0)
}}
          className="rounded-3xl w-full"
        >
          {data.map((item, idx) => (
            <SwiperSlide key={`${item.id}-${idx}`} className="w-full">
              <div
                className={`
                  grid grid-cols-1 md:grid-cols-2 gap-10 items-center overflow-hidden p-10 min-h-[450px] w-full
                  ${mergedStyles.cardBackground}
                  ${rounded ? "rounded-3xl" : ""}
                `}
              >
                
                {/* TEXT CONTENT CONTAINER */}
                <div
                  className={`
                    flex flex-col justify-center h-full w-full min-w-0
                    ${imagePosition === "left" ? "md:order-2" : "md:order-1"}
                  `}
                >
                  {showBadge && (
                    <p className={`${mergedStyles.badgeTextColor} font-semibold mb-3`}>
                      SPECIAL OFFER
                    </p>
                  )}

                  <h1 className={`${mergedStyles.titleSize} font-bold leading-tight mb-5 ${mergedStyles.titleTextColor} break-words`}>
                    {item.title}
                  </h1>

                  {showSubtitle && item.subtitle && (
                    <p className={`${mergedStyles.subtitleTextColor} ${mergedStyles.subtitleSize} mb-8 break-words`}>
                      {item.subtitle}
                    </p>
                  )}

                  {showButton && item.button && (
                    <div>
                      <button className={`${mergedStyles.buttonBackgroundColor} ${mergedStyles.buttonTextColor} px-8 py-4 rounded-xl transition-transform active:scale-95`}>
                        {item.button}
                      </button>
                    </div>
                  )}
                </div>

                {/* IMAGE CONTAINER - Fixed for cross-browser compatibility */}
                <div
                  className={`
                    relative w-full h-[300px] md:h-[450px] rounded-2xl overflow-hidden
                    ${imagePosition === "left" ? "md:order-1" : "md:order-2"}
                  `}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onLoad={(e) => {
                      // Ensure image is loaded and trigger Swiper update
                      const img = e.currentTarget
                      img.classList.add('opacity-100')
                    }}
                    style={{ opacity: 0, transition: 'opacity 0.3s' }}
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