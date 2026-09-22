import { memo, useLayoutEffect, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { initParallaxScenesInRoot } from "../../utils/parallaxScenes.js"
import { ensureWowInitialized, refreshWowForContainer } from "../../utils/wowSpa.js"

/**
 * Renders legacy main column HTML (page-banner → content) inside the app shell.
 * @param {{ title?: string, html: string, afterInject?: (root: HTMLElement) => (void | (() => void)), parallax?: boolean }} props
 */
function InjectedMainColumn({ title, html, afterInject, parallax = true }) {
  const ref = useRef(null)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    if (title) document.title = title
  }, [title])

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined

    const handleAnchorClick = (e) => {
      const a = e.target.closest("a")
      if (!a) return
      const href = a.getAttribute("href")
      if (href && href.startsWith("/")) {
        // Handle SPA internal routes
        e.preventDefault()
        navigate(href)
      }
    }

    root.addEventListener("click", handleAnchorClick)
    return () => root.removeEventListener("click", handleAnchorClick)
  }, [navigate])

  useEffect(() => {
    const root = ref.current
    if (!root || !afterInject) return undefined
    return afterInject(root) ?? undefined
  }, [html, afterInject])

  useEffect(() => {
    if (!parallax) return undefined
    const root = ref.current
    if (!root) return undefined
    let cleanupParallax = () => {}
    let cancelled = false
    initParallaxScenesInRoot(root).then((cleanup) => {
      if (cancelled) {
        cleanup()
        return
      }
      cleanupParallax = cleanup
    })
    return () => {
      cancelled = true
      cleanupParallax()
    }
  }, [html, parallax])

  useEffect(() => {
    const root = ref.current
    if (!root) return undefined
    let raf = 0
    let alive = true
    raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!alive) return
        ensureWowInitialized()
          .then(() => {
            if (alive) refreshWowForContainer(root)
          })
          .catch(() => {})
      })
    })
    return () => {
      alive = false
      cancelAnimationFrame(raf)
    }
  }, [html])

  return (
    <div
      ref={ref}
      className="spa-injected-root premium-page-shell w-full overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export default memo(InjectedMainColumn)
