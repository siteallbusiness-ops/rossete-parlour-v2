# Rossete Parlour

Production-ready Next.js foundation for a static website. This project provides the architecture, layout system, routing, and reusable components — ready for page content to be built on top.

## Tech Stack

- **Next.js 16** (App Router)
- **JavaScript** (no TypeScript)
- **CSS Modules** + plain CSS
- **ESLint**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project Structure

```
├── app/                    # App Router pages & layouts
│   ├── layout.js           # Root layout (Header + Main + Footer)
│   ├── page.js             # Home
│   ├── loading.js          # Global loading UI
│   ├── not-found.js        # 404 page
│   ├── about/
│   ├── contact/
│   ├── services/
│   ├── blog/
│   └── privacy-policy/
│
├── components/
│   ├── Layout/             # MainLayout wrapper
│   ├── Header/             # Sticky header + mobile menu
│   ├── Footer/             # Site footer
│   ├── Navigation/         # Desktop & mobile nav
│   ├── Hero/               # Hero section placeholder
│   ├── Sections/           # Container, PageBanner, Breadcrumb, etc.
│   ├── Buttons/            # Button component
│   ├── Cards/              # Card variants
│   ├── Forms/              # ContactForm, Newsletter
│   └── Common/             # Logo, ResponsiveImage, SocialLinks
│
├── styles/
│   ├── variables.css       # Design tokens
│   ├── reset.css           # CSS reset
│   ├── utilities.css       # Utility classes
│   └── animations.css      # Animations & transitions
│
├── constants/              # Site config & navigation
├── hooks/                  # Custom React hooks
├── utils/                  # Helper functions
└── public/                 # Static assets
    ├── images/
    ├── icons/
    ├── logos/
    └── favicon/
```

## Architecture

### Layout

Every page automatically uses the shared layout via `app/layout.js` → `MainLayout`:

```
Header → Main Content → Footer
```

Header and Footer are never duplicated on individual pages.

### CSS

Global styles are imported in `app/globals.css`:

1. `styles/variables.css` — colors, typography, spacing, breakpoints
2. `styles/reset.css` — browser reset
3. `styles/utilities.css` — container, grid, flex, spacing helpers
4. `styles/animations.css` — fade, slide, hover transitions

Component-specific styles use CSS Modules (`.module.css`).

### Responsive Breakpoints

| Name         | Width    |
| ------------ | -------- |
| Small Mobile | < 480px  |
| Mobile       | < 768px  |
| Tablet       | 768px+   |
| Laptop       | 1024px+  |
| Desktop      | 1280px+  |

### SEO

Page metadata is managed via `utils/metadata.js` and exported from each route's `page.js`.

## Adding Content

1. Edit placeholder pages in `app/[route]/page.js`
2. Build sections using components from `components/Sections/` and `components/Cards/`
3. Update site info in `constants/site.js` and navigation in `constants/navigation.js`
4. Add images to `public/images/` and use `ResponsiveImage` component

## License

Private — All rights reserved.
