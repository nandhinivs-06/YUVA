import { memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { getEventBySlug } from "../../data/eventsData.js"

function EventNavigation({ prevSlug, nextSlug }) {
  const prevEvent = prevSlug ? getEventBySlug(prevSlug) : null
  const nextEvent = nextSlug ? getEventBySlug(nextSlug) : null

  if (!prevEvent && !nextEvent) return null

  return (
    <section className="pb-70 pt-20 event-navigation-section">
      <div className="container">
        <div className="pt-30 border-t border-slate-200">
          <div className="row align-items-center">
            {/* Previous Event */}
            <div className="col-lg-5 col-md-5 mb-20 mb-md-0">
              {prevEvent ? (
                <motion.div
                  className="prev-post flex items-center gap-3.5 group"
                  whileHover={{ x: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={`/events/${prevEvent.slug}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100 shadow-sm"
                  >
                    <img
                      src={prevEvent.image}
                      alt={prevEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                  <div className="text min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-muted font-bold block">
                      ← Previous Event
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-brand-600 transition-colors mt-0.5 truncate">
                      <Link to={`/events/${prevEvent.slug}`}>{prevEvent.title}</Link>
                    </h4>
                    <p className="text-xs text-muted mt-0.5">{prevEvent.date}</p>
                  </div>
                </motion.div>
              ) : null}
            </div>

            {/* Center All Initiatives Link */}
            <div className="col-lg-2 col-md-2 text-center my-3 my-md-0">
              <Link
                to="/initiatives"
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-600 text-xs font-semibold transition-all border border-slate-200"
                title="View All Initiatives"
              >
                All Initiatives
              </Link>
            </div>

            {/* Next Event */}
            <div className="col-lg-5 col-md-5">
              {nextEvent ? (
                <motion.div
                  className="next-post flex items-center justify-end gap-3.5 text-right group"
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text min-w-0">
                    <span className="text-[11px] uppercase tracking-wider text-muted font-bold block">
                      Next Event →
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-ink group-hover:text-brand-600 transition-colors mt-0.5 truncate">
                      <Link to={`/events/${nextEvent.slug}`}>{nextEvent.title}</Link>
                    </h4>
                    <p className="text-xs text-muted mt-0.5">{nextEvent.date}</p>
                  </div>
                  <Link
                    to={`/events/${nextEvent.slug}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200 bg-slate-100 shadow-sm"
                  >
                    <img
                      src={nextEvent.image}
                      alt={nextEvent.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </Link>
                </motion.div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(EventNavigation)
