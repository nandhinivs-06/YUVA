import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { parse } from "../web/node_modules/node-html-parser/dist/index.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const legacyContentPath = path.join(__dirname, "../web/src/generated/legacyContent.js")
const portfolioItemsPath = path.join(__dirname, "../web/src/data/portfolioItems.js")
const outputPath = path.join(__dirname, "../web/src/data/eventsData.js")

const { legacyPageBodies } = await import(`file://${legacyContentPath.replace(/\\/g, "/")}`)
const { portfolioItems } = await import(`file://${portfolioItemsPath.replace(/\\/g, "/")}`)

const normalizePath = (p) => {
  if (!p) return ""
  return p.replace(/\\/g, "/").replace(/^\/+/, "/").trim()
}

const events = portfolioItems.map((item, index) => {
  const html = legacyPageBodies[item.file] || ""
  const root = parse(html)

  // 1. Breadcrumb / Title
  const breadcrumb =
    root.querySelector(".breadcrumbs-link .active")?.textContent?.trim() || item.title
  const headingTitle =
    root.querySelector(".team-details-wrapper .title, .text-wrapper .title, .text .title, h3.title")
      ?.textContent?.trim() || item.title

  // 2. Poster Image (Main event poster)
  let posterImg = root
    .querySelector(".team-details-wrapper img, .porfolio-item img, .portfolio-details-wrapper img, .img-holder-box img")
    ?.getAttribute("src")

  if (posterImg && !posterImg.includes("shape")) {
    posterImg = normalizePath(posterImg.replace(/^\.\./, ""))
    if (!posterImg.startsWith("/")) posterImg = `/${posterImg}`
  } else {
    posterImg = null
  }

  // 3. Date
  const dateEl = root.querySelector(
    ".team-details-wrapper .position, .text-wrapper .position, .text .position"
  )
  const rawDateText = dateEl?.textContent?.trim() || item.date || ""

  // 4. Story Paragraphs
  const pElements = root.querySelectorAll(
    ".team-details-wrapper p, .text-wrapper p, .portfolio-details-wrapper p"
  )
  const paragraphs = []
  for (const p of pElements) {
    const text = p.textContent.replace(/\s+/g, " ").trim()
    if (!text) continue
    // Skip if it is purely date or title or crumb
    if (
      text === rawDateText ||
      text === item.date ||
      text === headingTitle ||
      text === breadcrumb
    )
      continue
    if (text.length < 20 && (text.includes("202") || text.includes("201"))) continue
    if (!paragraphs.includes(text)) {
      paragraphs.push(text)
    }
  }

  // 4. Metadata Process Items
  const meta = []
  root.querySelectorAll(".process-item").forEach((pi) => {
    const label = pi.querySelector("h4")?.textContent?.trim()
    const value = pi.querySelector("p")?.textContent?.trim()
    let icon = pi.querySelector("img")?.getAttribute("src")
    if (icon) {
      icon = normalizePath(icon.replace(/^\.\./, ""))
      if (!icon.startsWith("/")) icon = `/${icon}`
    }
    if (label && value) {
      meta.push({ label, value, icon: icon || null })
    }
  })

  // 5. Gallery Images
  const gallery = []
  root
    .querySelectorAll(
      ".team-area-v2 img, .portfolio-style-one img, a.img-popup, a.portfolio-hover"
    )
    .forEach((el) => {
      let src = el.getAttribute("src") || el.getAttribute("href")
      if (!src) return
      src = normalizePath(src.replace(/^\.\./, ""))
      if (!src.startsWith("/")) src = `/${src}`
      if (src.includes("/Events/") && !gallery.includes(src)) {
        gallery.push(src)
      }
    })

  // 6. Navigation
  const prevTitle = root.querySelector(".prev-post h4")?.textContent?.trim() || null
  const nextTitle = root.querySelector(".next-post h4")?.textContent?.trim() || null

  let imagePath = item.image || ""
  imagePath = normalizePath(imagePath)
  if (!imagePath.startsWith("/")) imagePath = `/${imagePath}`

  return {
    slug: item.slug,
    title: item.title,
    file: item.file,
    originalFile: item.file,
    date: item.date || rawDateText,
    subtitleDate: rawDateText,
    image: imagePath,
    poster: posterImg || imagePath,
    mediaType: item.mediaType || "image",
    categories: item.categories || [],
    breadcrumb,
    paragraphs,
    meta,
    gallery,
    prevPostTitle: prevTitle,
    nextPostTitle: nextTitle,
  }
})

// Build previous/next slug linkages
const slugByTitle = new Map()
const slugByFile = new Map()
events.forEach((ev) => {
  slugByTitle.set(ev.title.toLowerCase(), ev.slug)
  slugByTitle.set(ev.breadcrumb.toLowerCase(), ev.slug)
  slugByFile.set(ev.originalFile.toLowerCase(), ev.slug)
})

const enrichedEvents = events.map((ev, i) => {
  let prevSlug = null
  let nextSlug = null

  if (ev.prevPostTitle) {
    prevSlug = slugByTitle.get(ev.prevPostTitle.toLowerCase()) || null
  }
  if (!prevSlug && i > 0) {
    prevSlug = events[i - 1].slug
  }

  if (ev.nextPostTitle) {
    nextSlug = slugByTitle.get(ev.nextPostTitle.toLowerCase()) || null
  }
  if (!nextSlug && i < events.length - 1) {
    nextSlug = events[i + 1].slug
  }

  return {
    ...ev,
    prevSlug,
    nextSlug,
  }
})

const fileContent = `// Auto-generated comprehensive events dataset for React components
export const eventsData = ${JSON.stringify(enrichedEvents, null, 2)};

export const getEventBySlug = (slug) => {
  if (!slug) return null;
  return eventsData.find((e) => e.slug === slug || e.slug.toLowerCase() === slug.toLowerCase()) || null;
};

export const getRelatedEvents = (event, limit = 3) => {
  if (!event) return [];
  const cats = new Set(event.categories || []);
  return eventsData
    .filter((e) => e.slug !== event.slug && (e.categories || []).some((c) => cats.has(c)))
    .slice(0, limit);
};
`

fs.writeFileSync(outputPath, fileContent, "utf8")
console.log(`Successfully generated ${enrichedEvents.length} events in ${outputPath}`)
