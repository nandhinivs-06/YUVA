import { memo, useState, useCallback } from "react"
import { motion } from "framer-motion"
import EventLightbox from "./EventLightbox.jsx"

const galleryContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const galleryItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

function EventGallery({ gallery, title }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const handleOpen = useCallback((index) => {
    setActiveIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const handlePrev = useCallback(() => {
    setActiveIndex((curr) => (curr > 0 ? curr - 1 : gallery.length - 1))
  }, [gallery])

  const handleNext = useCallback(() => {
    setActiveIndex((curr) => (curr < gallery.length - 1 ? curr + 1 : 0))
  }, [gallery])

  if (!gallery || gallery.length === 0) return null

  return (
    <section className="pt-20 pb-70 event-gallery-section" id="event-gallery">
      <div className="container">
        {/* Gallery Title */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] text-center mb-10 tracking-tight">
          Event Gallery
        </h2>

        {/* 4-Column Compact Photo Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto px-4"
          variants={galleryContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {gallery.map((imgSrc, index) => (
            <motion.div
              key={index}
              className="w-full"
              variants={galleryItem}
            >
              <div
                className="group relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 bg-slate-800 cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handleOpen(index)}
              >
                <img
                  src={imgSrc}
                  alt={`${title} highlight ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white/95 text-ink text-xs font-semibold px-3.5 py-1.5 rounded-full shadow flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <i className="far fa-search-plus text-brand-600" /> View
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <EventLightbox
        isOpen={lightboxOpen}
        images={gallery}
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </section>
  )
}

export default memo(EventGallery)
