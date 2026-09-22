import { memo, useLayoutEffect, useMemo, useState, useCallback } from "react"
import { Link, useParams } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { getEventBySlug } from "../data/eventsData.js"
import {
  EventHero,
  EventOverview,
  EventMetaGrid,
  EventGallery,
  EventLightbox,
  EventNavigation,
  RelatedEvents,
} from "../components/events/index.js"

function EventDetailPage() {
  const { slug } = useParams()
  const event = useMemo(() => getEventBySlug(slug), [slug])

  const [overviewLightboxOpen, setOverviewLightboxOpen] = useState(false)

  useLayoutEffect(() => {
    if (event?.title) {
      document.title = `${event.title} | Yi YUVA REC`
    } else {
      document.title = "Event Not Found | Yi YUVA REC"
    }
  }, [event])

  const handleOpenMedia = useCallback(() => {
    setOverviewLightboxOpen(true)
  }, [])

  const handleCloseMedia = useCallback(() => {
    setOverviewLightboxOpen(false)
  }, [])

  if (!event) {
    return (
      <main className="mx-auto max-w-xl px-4 py-28 text-center min-h-[50vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4 text-2xl">
          <i className="far fa-exclamation-triangle" />
        </div>
        <h1 className="text-3xl font-bold text-ink mb-2">Event Not Found</h1>
        <p className="text-muted text-base max-w-md">
          The requested initiative could not be found or may have been moved.
        </p>
        <Link
          to="/initiatives"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-600 hover:bg-brand-700 px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors"
        >
          <i className="fas fa-arrow-left text-xs" /> Explore All Initiatives
        </Link>
      </main>
    )
  }

  const posterImage = event.poster || event.image

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={event.slug}
        className="event-detail-page bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Banner with Breadcrumbs & Categories */}
        <EventHero event={event} />

        {/* Main Content: Event Poster on Left, Title + Purple Date + Story on Right */}
        <EventOverview event={event} onOpenMedia={handleOpenMedia} />

        {/* Process Steps: Round Blue Icons with Curved Dashed Purple Arrows */}
        {event.meta && event.meta.length > 0 && <EventMetaGrid meta={event.meta} />}

        {/* Photo Gallery: 4-Column Clean Grid */}
        {event.gallery && event.gallery.length > 0 && (
          <EventGallery gallery={event.gallery} title={event.title} />
        )}

        {/* Previous & Next Post Navigation */}
        <EventNavigation prevSlug={event.prevSlug} nextSlug={event.nextSlug} />

        {/* Related Events Discovery */}
        <RelatedEvents currentEvent={event} />

        {/* Fullscreen Lightbox for Main Poster */}
        {overviewLightboxOpen && (
          <EventLightbox
            isOpen={overviewLightboxOpen}
            images={[posterImage]}
            activeIndex={0}
            onClose={handleCloseMedia}
            onPrev={() => {}}
            onNext={() => {}}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default memo(EventDetailPage)
