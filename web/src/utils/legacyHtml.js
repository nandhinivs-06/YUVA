import { legacyPageTitles, legacyPageBodies } from "../generated/legacyContent.js"
import { legacyFullDocuments } from "../generated/legacyFullDocuments.js"

export function normalizeLegacyHtml(html) {
  if (!html) return html

  // Repair malformed legacy markup like `<section ...> id="event-gallery"`
  // so the id is attached to the section instead of rendered as text.
  let s = html.replace(
    /(<section\b[^>]*?)>\s*id=(["'][^"']+["'])/gi,
    "$1 id=$2>",
  )

  // Replace legacy lightbulb graphic template image paths with real event photos
  s = s.replace(/\/assets\/images\/portfolio\/Timeless Treasures Portfolio\.png/g, "/assets/images/Events/Timeless Treasures/1.png")
  s = s.replace(/\/assets\/images\/portfolio\/republic rhytms cover page 1\.png/g, "/assets/images/Events/Republic Rhythms/1.jpg")
  s = s.replace(/\/assets\/images\/portfolio\/Akshayapatra4\.0\.png/g, "/assets/images/Events/Akshayapatra 4.0/1.png")
  s = s.replace(/\/assets\/images\/portfolio\/e cycle portfolio picture\.png/g, "/assets/images/Events/E cycle/2.jpg")
  s = s.replace(/\/assets\/images\/portfolio\/Instolutions 3.0 Portfolio\.png/g, "/assets/images/Events/Instolutions 3.0/Instolutions 3.0 Gallery.png")
  s = s.replace(/\/assets\/images\/portfolio\/FinFluent Portfolio\.png/g, "/assets/images/Events/FinFluent/10.png")
  s = s.replace(/\/assets\/images\/portfolio\/Smash 3.0 Portfolio\.png/g, "/assets/images/Events/Smash 3.0/9.png")
  s = s.replace(/\/assets\/images\/portfolio\/Yi Annual day portfolio\.png/g, "/assets/images/Events/Yi Annual day 2024/Yi annual day 2024 grp pic.png")
  s = s.replace(/\/assets\/images\/portfolio\/planting smiles cover pic\.png/g, "/assets/images/Events/Planting smiles/planting smiles 1.JPG")
  s = s.replace(/\/assets\/images\/portfolio\/Route Cause Portfolio\.png/g, "/assets/images/Events/Route Cause/Route Cause-01.png")

  return s
}

/**
 * @returns {{ mode: "iframe" | "body", title: string, html: string } | null}
 */
export function getLegacyRender(filename) {
  const title = legacyPageTitles[filename] || "Yi YUVA REC"
  const full = legacyFullDocuments[filename]
  if (full) return { mode: "iframe", title, html: normalizeLegacyHtml(full) }
  const body = legacyPageBodies[filename]
  if (body) return { mode: "body", title, html: normalizeLegacyHtml(body) }
  return null
}
