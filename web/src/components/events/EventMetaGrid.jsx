import { memo, useState } from "react"
import { motion } from "framer-motion"

// Curved dashed purple arrow between process items
function CurvedArrow() {
  return (
    <div className="hidden sm:flex items-center justify-center flex-shrink-0 w-12 sm:w-16 md:w-24 pointer-events-none select-none">
      <svg
        className="w-full h-10 transition-all duration-300"
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 30 Q 50 4, 85 18"
          stroke="#6C5CE7"
          strokeWidth="2.5"
          strokeDasharray="5 5"
          strokeLinecap="round"
        />
        <path
          d="M 72 12 L 87 18 L 81 29"
          stroke="#6C5CE7"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </div>
  )
}

function getIconSrc(label) {
  const l = (label || "").toLowerCase()
  if (l.includes("vertical")) {
    return "/assets/images/icon/icon-7.png"
  }
  if (l.includes("audience")) {
    return "/assets/images/icon/icon-9.png"
  }
  return "/assets/images/icon/icon-8.png"
}

function MetaItem({ item, index, totalItems }) {
  const [isHovered, setIsHovered] = useState(false)
  const iconSrc = item.icon || getIconSrc(item.label)

  return (
    <div className="flex items-start flex-1 min-w-0 max-w-[320px]">
      {/* Process Step Item */}
      <motion.div
        className="flex flex-col items-center text-center px-1 sm:px-3 py-2 w-full"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        animate={{
          y: isHovered ? -6 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* 3D Blue Orb Icon - Fixed height container for horizontal alignment */}
        <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center mb-2">
          <motion.div
            className="w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 flex items-center justify-center"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <img
              src={iconSrc}
              alt={item.label}
              className="w-full h-full object-contain filter drop-shadow-md"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Step Title */}
        <h3 className="text-base sm:text-xl lg:text-2xl font-black text-[#111827] mb-1.5 tracking-tight flex items-center justify-center min-h-[32px]">
          {item.label}
        </h3>

        {/* Step Subtitle / Value */}
        <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-700 leading-snug w-full">
          {item.value}
        </p>
      </motion.div>

      {/* Connecting Curved Arrow at exact icon height center */}
      {index < totalItems - 1 && (
        <div className="h-16 sm:h-20 lg:h-24 flex items-center justify-center flex-shrink-0">
          <CurvedArrow />
        </div>
      )}
    </div>
  )
}

function EventMetaGrid({ meta }) {
  if (!meta || meta.length === 0) return null

  return (
    <section className="py-10 bg-white event-meta-process-section">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-row flex-nowrap items-start justify-center gap-1 sm:gap-3 lg:gap-6 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {meta.map((item, idx) => (
            <MetaItem
              key={idx}
              item={item}
              index={idx}
              totalItems={meta.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(EventMetaGrid)
