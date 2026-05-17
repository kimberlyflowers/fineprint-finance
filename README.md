# Fine Print Finance

The website for **Fine Print Finance** — an AI YouTube channel that decodes the financial fine print every industry hides from regular people. Taxes, investing, healthcare, banking, real estate, and cash flow — explained in plain English with real dollar amounts.

> *The money was always there. Nobody showed you where to look.*

## What's here

```
.
├── blog/                              # The website (React + Babel, SPA)
│   ├── index.html                     # Entry shell
│   ├── styles.css                     # Brand-aligned styles
│   ├── data.jsx                       # Articles, events, community, IMAGES config
│   ├── components.jsx                 # Nav, ArticleCard, Footer, ChatWidget...
│   ├── events.jsx                     # Events list + detail pages
│   ├── pages.jsx                      # Home, Blog, Article, Ask-a-Pro, About
│   └── app.jsx                        # App shell + routing
│
├── Fine Print Finance Brand Kit.html  # Full brand guidelines
├── Fine Print Finance Brand Kit-print.html  # Print-ready PDF version
└── assets/                            # Images: hero, Josh, thumbnails
```

## Local dev

Just open `blog/index.html` in a browser. No build step — Babel transpiles JSX in the browser.

## Replacing images

Every image path on the site is centralized in **`blog/data.jsx`** under the `IMAGES` config:

```js
const IMAGES = {
  hero:    '../assets/hero-image.png',     // 2560×1440 full-screen hero
  josh:    '../assets/josh-portrait.png',  // portrait, used everywhere
  thumbnails: {
    moneyMissed:  '../assets/thumb-money-missed.png',
    taxStrategy:  '../assets/thumb-tax-strategy.png',
    irsRewards:   '../assets/thumb-irs-rewards.png',
    stopOverpay:  '../assets/thumb-stop-overpaying.png',
  },
};
```

To swap: drop a new file into `/assets/` and update the path. Every `<img>` on the site routes through a `SmartImage` component — if a file is missing, it shows a labeled placeholder card instead of breaking.

## Adding articles

Articles live in `blog/data.jsx` under `ARTICLES`. Each article supports rich block types in its `body` array:

- `lede` — large opening paragraph
- `p` — paragraph
- `h2` / `h3` — headings
- `list` — bulleted list (gradient accent bullets)
- `quote` — pull quote
- `stat` — big-number callout
- `fineprint` — "§" footnote box
- `image` — `{ type:'image', src:'...', caption:'...' }`
- `video` — `{ type:'video', embed:'https://www.youtube.com/embed/ID', caption:'...' }` or a click-through play card

## Adding events

Events live in `blog/data.jsx` under `EVENTS`. Each event supports free + paid ticket tiers, schedule rows, speakers, FAQs, and a sticky right-side ticket card with Stripe-secure-checkout messaging. Hook the `Register` button up to your real checkout when ready.

## Chat widget

Bottom-right floating chat — pre-wired to look + feel like a Go High Level chat. Replace the mock chat component with your live GHL embed when ready. The footer label already reads "Powered by Go High Level."

## Brand kit

Lives at `Fine Print Finance Brand Kit.html` and is linked from the site footer (Resources → Brand kit). The `-print.html` version auto-prints on load for PDF export.

---

© 2026 Fine Print Finance · All rights reserved
