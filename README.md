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

Here is a quick overview of how the project files are organized:
```text
welo-sefer-church/
├── index.html              # Main entry point
├── logo.png                # Browser tab favicon icon
├── curent church.PNG       # Banner image asset
├── src/
│   ├── main.tsx            # React app entry point
│   ├── App.tsx             # Root component with routing
│   ├── index.css           # Global styles and Tailwind imports
│   ├── firebase.ts         # Firebase configuration
│   ├── translations.ts     # Multi-language translations
│   ├── context/
│   │   └── AuthContext.tsx  # Authentication context
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer section
│   │   ├── AuthModal.tsx    # Login/signup modal
│   │   ├── ContactSection.tsx
│   │   ├── EventCalendar.tsx
│   │   ├── GallerySection.tsx
│   │   ├── HistorySection.tsx
│   │   └── LocationSection.tsx
│   └── pages/
│       ├── Home.tsx
│       ├── Contact.tsx
│       ├── Events.tsx
│       ├── Gallery.tsx
│       ├── History.tsx
│       ├── Location.tsx
│       └── Developer.tsx
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── eslint.config.js        # ESLint configuration
```
