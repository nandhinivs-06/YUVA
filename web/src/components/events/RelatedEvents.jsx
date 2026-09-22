import { memo, useMemo } from "react"
import { getRelatedEvents } from "../../data/eventsData.js"
import InitiativeCard from "../home/InitiativeCard.jsx"

function RelatedEvents({ currentEvent }) {
  const related = useMemo(() => {
    return getRelatedEvents(currentEvent, 3)
  }, [currentEvent])

  if (!related || related.length === 0) return null

  return (
    <section className="portfolio-area light-gray-bg pt-80 pb-60 related-events-section border-t border-slate-200/80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title mb-45">
              <span className="sub-title st-one mb-3">Explore More</span>
              <h2 className="text-2xl md:text-3xl font-bold text-ink">Related Initiatives</h2>
              <p className="text-muted text-sm mt-1">
                Discover other impactful projects from the same domain
              </p>
            </div>
          </div>
        </div>

        <div className="row portfolio-grid">
          {related.map((item) => (
            <InitiativeCard key={item.slug} item={item} initiativesMode />
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(RelatedEvents)
