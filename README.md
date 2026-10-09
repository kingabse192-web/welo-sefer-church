# Welo Sefer St. Mary & St. Gabriel Church Community Hub

<div align="center">
  <img width="1200" height="475" alt="Banner" src="public/curent church.PNG" />
</div>

<br />

Welcome to the official repository for the **Welo Sefer St. Mary & St. Gabriel Church** project. This platform serves as a digital home for the community in Addis Ababa — connecting members, sharing the faith, and keeping everyone informed.

## 🚀 About the Project & My Journey

This is a fully responsive, interactive web application built for the Welo Sefer St. Mary & St. Gabriel Church community.

As a young developer living in Addis Ababa, I wanted to use my skills to give back to my community. This platform bridges the gap between traditional community gathering and the modern digital space — keeping everyone connected, informed, and united no matter where they are.

### Key Features
* **Bilingual (English / አማርኛ):** One-tap language switching with dynamic fonts, `lang`/`dir` attributes, and per-language page metadata.
* **Interactive Landing Page:** A cinematic welcome with a drawn-gold emblem, staggered hero reveal, watermark wordmarks, and a crafted brand splash.
* **Media Gallery:** Optimized, responsive masonry gallery with a full-featured lightbox — swipe, pinch-to-zoom, pan, fullscreen, keyboard navigation, and always-visible photo counter.
* **Events & Feast Calendar:** Filterable, paginated event grid with type/date filters, an automatic **Next Feast** spotlight, and rich event detail modals.
* **History Timeline:** Stage-by-stage church history with tabbed sections (Evolution, Miracles, የሰንበት ትምህርት ቤት / Sunday School).
* **Location & Contact:** Embedded map with copy-on-tap coordinates, donation bank cards, and a contact form backed by Firebase.
* **Custom Tab Icon (Favicon):** A customized brand icon beside the browser title.
* **100% Open-Source & Free:** Built with open-source technologies and hosted on a free tier to stay sustainable.
* **Lightweight & Fast:** Progressive JPEGs with lazy-loading + blur-up placeholders, prefetching, lazy Amharic fonts, and async route chunks.
* **Responsive & Accessible:** Full mobile–desktop support, a full-screen brand navigation drawer, `prefers-reduced-motion` support, visible focus rings, and WCAG-tuned contrast.

## 🛠️ Tech Stack

* **React 18** — component-based UI library
* **TypeScript** — type-safe JavaScript
* **Vite** — fast build tool and development server
* **Tailwind CSS** — utility-first CSS with a custom church design system
* **Framer Motion** — premium animation and transitions
* **React Router 6** — hash-based routing (`/#/...`) for static hosting
* **Firebase** — authentication + backend for the contact form
* **lucide-react** — lightweight icon set

## 🎨 Design System

* **Palette:** Royal Blue `#002366`, Deep Gold `#CFB53B`, Warm Cream `#FDFCF6`.
* **Night mode:** A deep navy system (`#050d1f` → `#0a1830` → `#101f3e`) with ambient gold/blue radial glows and a subtle film grain.
* **Typography:** Playfair Display (serif) + Inter (sans) for Latin; Noto Serif/Sans Ethiopic automatically for Amharic.
* **Details:** Gold ornamental dividers, gold-tinted scrollbars, breathing-glow hero, tap-scale feedback on every interactive surface.

## 🌐 Live Demo

Deployed to GitHub Pages automatically on every push to `main`:
👉 [https://kingabse192-web.github.io/welo-sefer-church/](https://kingabse192-web.github.io/welo-sefer-church/)

## 📁 Project Structure

```text
welo-sefer-church/
├── index.html                 # SEO/OG meta, theme-color, JSON-LD
├── vite.config.ts / tailwind.config.js / tsconfig.json
├── public/                    # Static images (photos, hero, logo, favicon)
├── src/
│   ├── main.tsx / App.tsx     # App shell: routing, theme, lang, splash, ambient bg
│   ├── index.css              # Global design system, scrollbars, keyframes
│   ├── translations.ts        # EN/AM translation dictionary
│   ├── galleryPhotos.ts       # Optimized gallery manifest (dimensions + LQIP)
│   ├── context/ · firebase.ts
│   ├── components/
│   │   ├── Navbar.tsx         # Desktop pills + full-screen brand mobile drawer
│   │   ├── Footer.tsx · WelcomeHero.tsx · WelcomeSplash.tsx
│   │   ├── EventCalendar.tsx · NextFeastSpotlight.tsx
│   │   ├── PhotoLightbox.tsx  # Swipe / pinch / fullscreen lightbox
│   │   ├── HistorySection.tsx · LocationSection.tsx · ContactSection.tsx
│   │   ├── PremiumButton.tsx · SlideIn.tsx · SectionHeader.tsx
│   │   ├── OrnamentDivider.tsx · AmbientBackground.tsx
│   │   ├── ScrollProgressBar.tsx · ScrollToTopButton.tsx · AuthModal.tsx
│   └── pages/
│       ├── Home.tsx · History.tsx · Gallery.tsx · Events.tsx
│       ├── Location.tsx · Contact.tsx · Developer.tsx · NotFound.tsx
└── package.json · eslint.config.js · postcss.config.js
```

## 🚦 Getting Started

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # type-check + production build into dist/
npm run preview    # preview the production build
```

> Note: the repo's `translations.ts` holds the community's copy — the author keeps UI wording and translations in sync on purpose. When contributing, prefer design/structural changes over rewriting provided copy.

## ☕ Support

This project is built and maintained freely for the community. Contributions, feedback, and bug reports are always welcome.