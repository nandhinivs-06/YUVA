import { memo, useLayoutEffect } from "react"
import { spaTeamIframeSrcDoc, spaPageTitles } from "../generated/spaPageBundles.js"

function injectPremiumTeamStyles(srcDoc) {
  const premiumStyles = `
    <style>
      body {
        background: linear-gradient(180deg, #f7f9fd 0%, #ffffff 44%, #f5f7fa 100%);
        color: #13203b;
      }

      a {
        color: inherit;
      }

      .page-banner {
        background: linear-gradient(135deg, #f7f8ff 0%, #edf1ff 54%, #ffffff 100%);
      }

      .page-banner:before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at top left, rgb(115 103 240 / 0.14), transparent 34%),
          radial-gradient(circle at right center, rgb(53 120 255 / 0.12), transparent 26%);
        pointer-events: none;
      }

      .page-banner .page-title h1 {
        color: #10204a;
        letter-spacing: -0.03em;
      }

      .breadcrumbs-link li,
      .breadcrumbs-link li a {
        color: #5b6480;
      }

      .section-title h2,
      .section-title .title,
      .team-area .team-item .text h4,
      .team-area .team-item .text p,
      .team-area-v3 .team-item .text h4,
      .team-area-v3 .team-item .text p,
      .portfolio-area .team-item .text h4,
      .portfolio-area .team-item .text p {
        color: #13203b;
      }

      .section-title .sub-title.st-one {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 13rem;
        min-height: 3.15rem;
        padding: 0.9rem 2.15rem;
        margin: 0 auto 1rem;
        border-radius: 9999px;
        border: 1px solid #c8bdf5;
        color: #2d33a8;
        background: linear-gradient(135deg, rgb(245 243 255 / 0.96) 0%, rgb(228 223 255 / 0.92) 100%);
        box-shadow: 0 12px 24px -18px rgb(80 72 170 / 0.38), inset 0 1px 0 rgb(255 255 255 / 0.88);
      }

      .section-title .sub-title.st-one:after {
        content: none;
      }

      .team-area,
      .team-area-v3,
      .portfolio-area,
      .testimonial-area {
        position: relative;
        isolation: isolate;
      }

      .team-area::before,
      .team-area-v3::before,
      .portfolio-area::before,
      .testimonial-area::before {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, rgb(255 255 255 / 0.8), rgb(243 246 255 / 0.82));
        z-index: -1;
      }

      .team-area-v2 .row,
      .portfolio-area-v2 .row {
        display: flex;
        flex-wrap: wrap;
      }

      .team-area-v2 .row > [class*="col-"],
      .portfolio-area-v2 .row > [class*="col-"] {
        display: flex;
        flex-direction: column;
      }

      .team-area-v2 .team-item,
      .portfolio-area-v2 .team-item {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        height: calc(100% - 55px);
        margin-bottom: 55px;
        border-radius: 1.05rem;
        overflow: hidden;
        border: 1px solid rgba(191, 205, 224, 0.72);
        background: linear-gradient(180deg, rgb(255 255 255 / 0.98) 0%, rgb(246 249 255 / 0.98) 100%);
        box-shadow: 0 16px 38px -28px rgb(23 39 67 / 0.45);
        transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
      }

      .team-area-v2 .team-item:hover,
      .portfolio-area-v2 .team-item:hover {
        transform: translateY(-8px);
        border-color: rgba(125, 109, 235, 0.42);
        box-shadow: 0 26px 52px -30px rgb(42 54 113 / 0.5);
      }

      .team-area-v2 .team-item .img-holder,
      .portfolio-area-v2 .team-item .img-holder {
        flex-shrink: 0;
        width: 100%;
        aspect-ratio: 4 / 4.75;
        overflow: hidden;
        background: #f1f4f9;
      }

      .team-area-v2 .team-item .img-holder img,
      .portfolio-area-v2 .team-item .img-holder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.45s ease;
      }

      .team-area-v2 .team-item:hover .img-holder img,
      .portfolio-area-v2 .team-item:hover .img-holder img {
        transform: scale(1.03);
      }

      .team-area-v2 .team-item .text,
      .portfolio-area-v2 .team-item .text {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
        padding: 26px 14px 22px;
      }

      .team-area-v2 .team-item .text h4 {
        margin: 4px 0 8px 0;
        min-height: 2.45rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #13203b;
        font-size: 1.38rem;
        font-weight: 700;
        letter-spacing: -0.015em;
        line-height: 1.25;
      }

      .team-area-v2 .team-item .text h4 br {
        display: none;
      }

      .team-area-v2 .team-item .text p.position {
        margin: 0;
        color: #13203b;
        min-height: 2.85rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.35;
      }

      .team-area-v2 .portfolio-style-two .portfolio-hover,
      .portfolio-area .portfolio-style-one .portfolio-hover {
        border-radius: 1rem;
      }

      .team-area-v2 .portfolio-style-two .portfolio-hover .hover-content,
      .portfolio-area .portfolio-style-one .portfolio-hover .hover-content {
        border-radius: 1rem;
        background: linear-gradient(180deg, rgb(18 31 59 / 0.1), rgb(18 31 59 / 0.78));
      }

      .footer-area.page-footer {
        background: linear-gradient(180deg, #eef2ff 0%, #ffffff 100%);
      }

      .footer-area .widget,
      .footer-area .copyright-text {
        color: #13203b;
      }

      .footer-area .widget-title {
        color: #2d33a8;
      }

      .footer-area .widget-nav a,
      .footer-area .social-nav a {
        color: #13203b;
      }

      .overlay {
        display: none;
        position: fixed;
        z-index: 99998;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(10, 16, 30, 0.75);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      .pop {
        display: none;
        position: fixed;
        z-index: 99999;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 92vw;
        max-width: 1240px;
        height: 88vh;
        max-height: 88vh;
        overflow-y: auto;
        overflow-x: hidden;
        background-color: #ffffff;
        border-radius: 20px;
        padding: 30px 24px 40px;
        box-shadow: 0 25px 70px rgba(0, 0, 0, 0.45);
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
      }

      .pop .team-area {
        padding-top: 10px;
        padding-bottom: 20px;
        background: transparent;
      }

      .pop .team-area::before {
        display: none !important;
      }

      .pop .container {
        max-width: 100%;
        padding-left: 12px;
        padding-right: 12px;
      }

      .pop .close-btn {
        position: sticky;
        top: 8px;
        float: right;
        width: 42px;
        height: 42px;
        line-height: 38px;
        text-align: center;
        background: #f1f4f9;
        border: 1px solid rgba(19, 32, 59, 0.12);
        border-radius: 50%;
        color: #13203b;
        font-size: 26px;
        font-weight: 400;
        cursor: pointer;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.25s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        margin-bottom: -42px;
      }

      .pop .close-btn:hover {
        background: #ef4444;
        color: #ffffff;
        border-color: #ef4444;
        transform: rotate(90deg) scale(1.05);
      }

      .pop .row {
        display: flex;
        flex-wrap: wrap;
      }

      .pop .row > [class*="col-"] {
        display: flex;
        flex-direction: column;
      }

      .pop .team-item {
        display: flex;
        flex-direction: column;
        flex: 1 1 auto;
        height: calc(100% - 35px);
        margin-bottom: 35px;
        border-radius: 1rem;
        overflow: hidden;
        border: 1px solid rgba(191, 205, 224, 0.75);
        background: linear-gradient(180deg, #ffffff 0%, #f7f9fd 100%);
        box-shadow: 0 10px 25px -15px rgba(23, 39, 67, 0.35);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }

      .pop .team-item:hover {
        transform: translateY(-6px);
        box-shadow: 0 18px 36px -20px rgba(42, 54, 113, 0.4);
      }

      .pop .team-item .img-holder {
        width: 100%;
        aspect-ratio: 1 / 1.05;
        overflow: hidden;
        background: #f1f4f9;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .pop .team-item .img-holder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
        transition: transform 0.4s ease;
      }

      .pop .team-item:hover .img-holder img {
        transform: scale(1.04);
      }

      .pop .team-item .text {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
        padding: 16px 12px 18px;
      }

      .pop .team-item .text h4 {
        margin: 0 0 6px 0;
        min-height: 2.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #13203b;
        font-size: 1.15rem;
        font-weight: 700;
        line-height: 1.25;
        text-align: center;
      }

      .pop .team-item .text h4 p,
      .pop .team-item .text h4 a {
        margin: 0;
        padding: 0;
        color: inherit;
        font-size: inherit;
        font-weight: inherit;
        line-height: inherit;
        text-decoration: none;
        display: inline;
      }

      .pop .team-item .text h4 br {
        display: none;
      }

      .pop .team-item .text p.position {
        margin: 0;
        color: #4b5563;
        font-size: 0.92rem;
        font-weight: 500;
        min-height: 2.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        line-height: 1.3;
      }
    </style>
  `

  return srcDoc.includes("</head>") ? srcDoc.replace("</head>", `${premiumStyles}</head>`) : `${premiumStyles}${srcDoc}`
}

function TeamSpaPage() {
  const premiumSrcDoc = injectPremiumTeamStyles(spaTeamIframeSrcDoc)

  useLayoutEffect(() => {
    document.title = spaPageTitles.team
  }, [])

  useLayoutEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById("root")
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    const prevBodyMargin = body.style.margin
    const prevRootOverflow = root?.style.overflow ?? ""
    const prevRootMinH = root?.style.minHeight ?? ""
    html.style.overflow = "hidden"
    body.style.overflow = "hidden"
    body.style.margin = "0"
    if (root) {
      root.style.overflow = "hidden"
      root.style.minHeight = "100%"
    }
    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      body.style.margin = prevBodyMargin
      if (root) {
        root.style.overflow = prevRootOverflow
        root.style.minHeight = prevRootMinH
      }
    }
  }, [])

  return (
    <iframe
      title={spaPageTitles.team}
      className="team-full-page-iframe fixed inset-0 z-[1] h-[100dvh] w-full border-0"
      srcDoc={premiumSrcDoc}
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
    />
  )
}

export default memo(TeamSpaPage)
