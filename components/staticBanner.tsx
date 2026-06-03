type StaticBannerProps = {
  image: string
  link?: string
  styles?: {
    containerMaxWidth?: string
    paddingY?: string
    borderRadius?: string
    height?: string
  }
}

export default function StaticBanner({
  image,
  link = "#",
  styles = {
    containerMaxWidth: "max-w-7xl",
    paddingY: "py-6",
    borderRadius: "rounded-xl",
    height: "h-auto"
  }
}: StaticBannerProps) {
  return (
    <section className={`${styles.containerMaxWidth} mx-auto px-6 ${styles.paddingY}`}>
      <a href={link} className="block overflow-hidden">
        <img 
          src={image} 
          alt="Promotional Banner" 
          className={`w-full ${styles.height} object-cover ${styles.borderRadius} hover:opacity-95 transition-opacity`}
        />
      </a>
    </section>
  )
}
