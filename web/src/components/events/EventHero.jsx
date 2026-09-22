import { memo } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { INITIATIVE_FILTERS } from "../../data/filters.js"

const categoryMap = new Map(INITIATIVE_FILTERS.map((f) => [f.id, f.label]))

function EventHero({ event }) {
  if (!event) return null

  const categories = (event.categories || []).map((catId) => ({
    id: catId,
    label: categoryMap.get(catId) || catId,
  }))

  return (
    <section className="page-banner bg_cover position-relative z-1 event-hero-section">
      <div className="shape shape-one scene">
        <span data-depth="1">
          <img src="/assets/images/shape/shape-1.png" alt="" />
        </span>
      </div>
      <div className="shape shape-two scene">
        <span data-depth="2">
          <img src="/assets/images/shape/shape-2.png" alt="" />
        </span>
      </div>
      <div className="shape shape-three scene">
        <span data-depth="3">
          <img src="/assets/images/shape/shape-3.png" alt="" />
        </span>
      </div>
      <div className="shape shape-four scene">
        <span data-depth="4">
          <img src="/assets/images/shape/shape-2.png" alt="" />
        </span>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div
              className="page-title text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {categories.length > 0 && (
                <div className="event-hero-badges mb-3 flex flex-wrap justify-center gap-2">
                  {categories.map((cat) => (
                    <span
                      key={cat.id}
                      className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200/80 shadow-xs"
                    >
                      {cat.label}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-ink mb-4">
                {event.title}
              </h1>

              <ul className="breadcrumbs-link flex items-center justify-center gap-1.5 text-sm text-muted">
                <li>
                  <Link to="/" className="hover:text-brand-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/initiatives" className="hover:text-brand-600 transition-colors">
                    Initiatives
                  </Link>
                </li>
                <li className="active font-medium text-brand-600">
                  {event.breadcrumb || event.title}
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(EventHero)
