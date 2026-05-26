# Welo Sefer St. Mary & St. Gabriel Church Community Hub

<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="curent church.PNG" />
</div>

<br />

Welcome to the official repository for the Welo Sefer St. Mary & St. Gabriel Church project. This platform serves as a digital hub for the community, providing updates, resources, and connection for its members.

## 🚀 About the Project & My Journey

This project is a fully responsive, interactive web application designed to serve the Welo Sefer St. Mary & St. Gabriel Church community in Addis Ababa. 

As a young developer living here, I wanted to use my skills to give back to my community. I built this platform to bridge the gap between traditional community gathering and the modern digital space. By creating an accessible, reliable online home for our church, my goal is to keep everyone connected, informed, and united—no matter where they are. 

### Key Features
* **Interactive Landing Page:** A clean, welcoming user interface tailored for community engagement.
* **Custom Tab Icon (Favicon):** Features a customized brand icon right next to the browser title layout.
* **100% Open-Source & Free:** Built entirely using open-source web technologies and hosted using free tier infrastructure to keep it sustainable.
* **Lightweight & Fast:** Optimized for quick loading times and smooth navigation across both desktop and mobile devices.
* **Responsive Layout:** Fully compatible with mobile phones, tablets, and desktop monitors.

## 🛠️ Tech Stack

This project is built using modern web technologies:
* **React 18:** Component-based UI library for interactive interfaces.
* **TypeScript:** Type-safe JavaScript for reliable code.
* **Vite:** Fast build tool and development server.
* **Tailwind CSS:** Utility-first CSS framework for responsive design.
* **Firebase:** Backend services for authentication and data storage.
* **Framer Motion:** Animation library for smooth transitions.

## 🌐 Live Demo

The project is actively deployed and can be viewed live at:  
👉 [https://kingabse192-web.github.io/welo-sefer-church/](https://kingabse192-web.github.io/welo-sefer-church/)

---

## 📁 Project Structure

```text
welo-sefer-church/
├── index.html                 # Main entry point
├── vite.config.ts             # Vite build config (base path, code splitting)
├── tailwind.config.js         # Tailwind CSS (custom colors, fonts)
├── tsconfig.json              # TypeScript config
├── tsconfig.node.json         # TypeScript Node config
├── eslint.config.js           # ESLint config
├── postcss.config.js          # PostCSS config
├── package.json               # Dependencies & scripts
├── README.md                  # This file
│
├── public/                    # Static assets (copied to dist/)
│   ├── logo.png               # Favicon
│   ├── developer.jpg           # Developer profile photo
│   ├── new church.jpg          # Hero background
│   ├── old church.jpg          # History section
│   ├── curent church.PNG       # Current church image
│   ├── galery.PNG / 1-5galery.PNG  # Gallery images
│   ├── comuniy.jpg / 2-3comuniy.jpg
│   ├── hosaena.jpg / hosaena galery (1-4).jpg
│   ├── best church person.jpg
│   ├── power of together.jpg
│   ├── speritual time-1.jpg
│   ├── suterday seremony.jpg
│   └── ... (other image assets)
│
├── src/
│   ├── main.tsx               # React entry point
│   ├── App.tsx                # Root component (router, layout, theme)
│   ├── index.css              # Tailwind, fonts, custom CSS
│   ├── firebase.ts            # Firebase initialization
│   ├── translations.ts        # English & Amharic text
│   │
│   ├── context/
│   │   └── AuthContext.tsx     # Firebase auth provider
│   │
│   ├── components/
│   │   ├── Navbar.tsx          # Responsive nav (scroll blur, lang/theme toggle)
│   │   ├── Footer.tsx          # 3-column footer with social links
│   │   ├── AuthModal.tsx       # Sign-in/sign-up modal (Google + email)
│   │   ├── ContactSection.tsx  # Contact form + bank donation info
│   │   ├── EventCalendar.tsx   # Filterable events with pagination
│   │   ├── GallerySection.tsx  # Masonry gallery + lightbox
│   │   ├── HistorySection.tsx  # Tabbed church history (3 stages)
│   │   └── LocationSection.tsx # Map embed + address + transit
│   │
│   └── pages/
│       ├── Home.tsx            # Hero + featured cards
│       ├── History.tsx         # Wraps HistorySection
│       ├── Gallery.tsx         # Wraps GallerySection
│       ├── Events.tsx          # Wraps EventCalendar
│       ├── Location.tsx        # Wraps LocationSection
│       ├── Contact.tsx         # Wraps ContactSection
│       └── Developer.tsx       # Developer profile page
│
├── firebase-applet-config.json  # Firebase service account
├── firebase-blueprint.json
├── firestore.rules
└── metadata.json
```
