# Portfolio Website (Azure-Focused)

This repository contains my portfolio app and serves as my main cloud transition case study: a Software Developer moving into Junior Cloud/DevOps on Azure.

Deployment direction for phase 1:
- Azure Static Web Apps for hosting
- Bicep for infrastructure as code
- GitHub Actions for CI/CD
- Separate `dev` and `prod` environments

The application source is under `app/`.

## Tech Stack

- React 18 + TypeScript
- styled-components
- Framer Motion
- Webpack 5

## Quick Start

Prerequisites:
- Node.js 18+
- npm

Install and run:

```bash
cd app
npm install
npm start
```

Local dev server: `http://localhost:9000`

Production build:

```bash
npm run build
```

Build output: `app/dist`

## Project Structure

```text
app/
  public/
  src/
  package.json
README.md
plans/
```

## Notes

- Current portfolio content is intentionally modest and evidence-based.
- Docker-related files may remain in the repo as legacy artifacts, but they are not the primary deployment story.

## License

ISC
