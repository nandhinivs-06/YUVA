import { memo } from "react"
import { motion } from "framer-motion"

function EventOverview({ event, onOpenMedia }) {
  if (!event) return null

  const displayImage = event.poster || event.image

  return (
    <section className="pt-50 pb-30 event-overview-section">
      <div className="container">
        <div className="row align-items-start">
          {/* Left Column: Event Poster */}
          <div className="col-lg-5 col-md-6 mb-40 mb-lg-0">
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 bg-white group cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => onOpenMedia && onOpenMedia(displayImage)}
            >
              {event.mediaType === "video" && !event.poster ? (
                <video
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl object-cover"
                >
                  <source src={event.image} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <>
                  <img
                    src={displayImage}
                    alt={event.title}
                    className="w-full h-auto object-contain rounded-2xl transition-transform duration-500 group-hover:scale-103"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/95 text-ink text-xs font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-2">
                      <i className="far fa-search-plus text-brand-600" /> View Full Poster
                    </span>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* Right Column: Title, Date & Story Description */}
          <div className="col-lg-7 col-md-6">
            <motion.div
              className="pl-0 lg:pl-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Event Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-2">
                {event.title}
              </h1>

              {/* Event Date in Bold Purple */}
              <p className="text-brand-600 font-bold text-base sm:text-lg mb-6 tracking-wide">
                {event.subtitleDate || event.date}
              </p>

              {/* Event Narrative Paragraphs */}
              <div className="event-paragraphs text-slate-600 leading-relaxed space-y-4 text-sm sm:text-base text-justify font-normal">
                {event.paragraphs && event.paragraphs.length > 0 ? (
                  event.paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="leading-relaxed">
                    {event.title} is an initiative organized by Yi YUVA REC dedicated to driving
                    meaningful community impact and youth leadership.
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(EventOverview)
