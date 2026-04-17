# Personal Portfolio Website

A personal portfolio website built with **React**, **TypeScript**, and **styled-components**, packaged to run anywhere with Docker.

**Live at:** [website.hoff3.net](https://website.hoff3.net/)

## Tech Stack

- React 18 + TypeScript
- styled-components + Tailwind CSS
- Framer Motion for animations
- Webpack 5 bundler
- Docker + Nginx for production

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- npm

### Install dependencies

```bash
cd app
npm install
```

### Run locally (development)

```bash
npm start
```

The dev server starts at [http://localhost:9000](http://localhost:9000).

### Build for production

```bash
npm run build
```

Output goes to the `app/dist` folder.

## Docker

### Build the image

Build for multiple platforms (AMD64 and ARM64):

```bash
docker buildx build --platform linux/amd64,linux/arm64 -t <your-username>/<image-name>:latest .
```

### Run the container

```bash
docker run -d -p 3000:3000 <your-username>/<image-name>:latest
```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
├── app/
│   ├── public/          # Static assets (index.html, resume PDF)
│   ├── src/
│   │   ├── components/  # React components (Hero, Navbar, Projects, etc.)
│   │   ├── img/         # Images
│   │   ├── App.tsx      # Root component
│   │   ├── index.tsx    # Entry point
│   │   ├── index.css    # Global styles
│   │   └── style.ts     # Styled-components theme
│   ├── package.json
│   ├── tsconfig.json
│   └── webpack.config.js
├── Dockerfile
├── nginx.conf
└── README.md
```

## Customization

- **Components:** Most of the UI lives in `app/src/components/`
- **Styles:** Global CSS in `app/src/index.css`, component styles use styled-components
- **Content:** Personal info, projects, and skills are defined in `app/src/App.tsx`

## Why Docker?

The repo was too large to fetch directly on some deployment targets (e.g. Raspberry Pi clusters), so the site is packaged as a Docker image for easy distribution.

## License

ISC
