import { memo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function EventLightbox({ isOpen, images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") onPrev()
      if (e.key === "ArrowRight") onNext()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen || !images || images.length === 0) return null

  const currentImage = images[activeIndex]

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-xl"
          onClick={(e) => {
            e.stopPropagation()
            onClose()
          }}
          aria-label="Close"
        >
          ✕
        </button>

        {/* Counter */}
        <div className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs tracking-wider">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Prev Button */}
        {images.length > 1 && (
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all text-xl"
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            aria-label="Previous image"
          >
            ‹
          </button>
        )}

        {/* Active Image */}
        <motion.div
          key={activeIndex}
          className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={currentImage}
            alt={`Gallery item ${activeIndex + 1}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-all text-xl"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            aria-label="Next image"
          >
            ›
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(EventLightbox)
