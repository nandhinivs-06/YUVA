import { memo, useMemo } from "react"
import { Link } from "react-router-dom"
import { portfolioItems } from "../../data/portfolioItems.js"
import { extraEventPages } from "../../data/extraEventPages.js"
import { getRecentPortfolioItems } from "../../utils/sortPortfolio.js"
import InitiativeCard from "./InitiativeCard.jsx"

export const RECENT_EVENTS_COUNT = 6

const allItems = [...portfolioItems, ...extraEventPages]

function RecentEventsSection() {
  const recent = useMemo(
    () => getRecentPortfolioItems(allItems, RECENT_EVENTS_COUNT),
    []
  )

  return (
    <section
      className="portfolio-area portfolio-area-v1 pt-130 pb-70 recent-events-section"
      aria-labelledby="recent-events-heading"
    >
      <div className="container">

        {/* ==============================
            CENTERED HEADER
           ============================== */}

        <div className="recent-events-header">

          <div className="section-title recent-events-title">

            <span className="sub-title st-one works-kicker">
              Our Works
            </span>

            <h2 id="recent-events-heading">
              Recent Events
            </h2>

            <p>
              Highlights from our latest initiatives
            </p>

          </div>

          {/* All Initiatives Button */}

          <div className="recent-events-button-wrapper">

            <Link
              to="/initiatives"
              className="main-btn bordered-btn btn-blue arrow-btn"
            >
              All Initiatives
            </Link>

          </div>

        </div>

        {/* ==============================
            EVENT CARDS
           ============================== */}

        <div className="row portfolio-grid recent-events-grid">

          {recent.map((item) => (
            <InitiativeCard
              key={item.slug + item.file}
              item={item}
            />
          ))}

        </div>

      </div>
    </section>
  )
}

export default memo(RecentEventsSection)