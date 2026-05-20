# Phase 1 Plan: Azure Portfolio Repositioning

## Goals
- Reposition the portfolio as a credible case study for a Software Developer transitioning into Junior Cloud/DevOps on Azure.
- Move the primary deployment story from Docker/Nginx to Azure Static Web Apps.
- Provision Azure infrastructure with Bicep in `West Europe`.
- Implement separate `dev` and `prod` environments using separate Static Web Apps.
- Add practical CI/CD with GitHub Actions for validation, infrastructure deployment, and app deployment.
- Keep the application source under `app/`.
- Rewrite site and repo content so claims match what is actually implemented.

## Non-Goals
- No backend or API in phase 1.
- No Docker or Nginx as the main hosting or deployment story.
- No App Insights or monitoring stack in phase 1.
- No Terraform, Azure DevOps Pipelines, AKS, Container Apps, Front Door, Key Vault, or Functions.
- No complex release orchestration, preview environments, or heavy end-to-end coverage in phase 1.

## Chosen Defaults
| Area | Decision |
| --- | --- |
| Positioning | Software Developer transitioning into Junior Cloud/DevOps on Azure |
| Azure region | `westeurope` |
| Hosting | Azure Static Web Apps |
| IaC | Bicep |
| CI/CD | GitHub Actions |
| Environments | Separate `dev` and `prod` Static Web Apps |
| Pricing | SWA Free for both `dev` and `prod` in phase 1 |
| Monitoring | Skip App Insights in phase 1 |
| Infra auth | GitHub Actions OIDC to Azure |
| App deploy auth | Static Web Apps deployment tokens |
| App location | `app/` |
| Frontend build | Existing React + TypeScript + Webpack app |
| Primary story removed | Docker/Nginx |

## Backlog Ordered By Implementation Sequence
1. Clean up current positioning and repo credibility
- Rewrite the README opening to remove Docker-first messaging.
- Remove Docker/Nginx as the primary hosting narrative.
- Remove unsupported or inflated claims from site copy and docs.
- Keep Docker artifacts only if they remain clearly secondary; otherwise remove them later.

2. Establish baseline frontend quality gates
- Add `lint` support.
- Keep `type-check`.
- Replace the placeholder `test` script with real smoke tests.
- Ensure the production build works from `app/`.

3. Add Azure Static Web Apps runtime configuration
- Add `staticwebapp.config.json`.
- Configure SPA fallback routing.
- Add only the route or header rules needed for a static portfolio.

4. Add infrastructure as code with Bicep
- Create `infra/` with a root deployment and environment parameter files.
- Provision separate resource groups and separate Static Web Apps for `dev` and `prod`.
- Target `West Europe`.
- Keep modules minimal and easy to explain.

5. Add GitHub Actions CI workflow
- Validate pull requests and pushes with install, lint, type-check, test, and build.
- Run only against the app in `app/`.

6. Add GitHub Actions infra workflow
- Use OIDC for Azure login.
- Run Bicep validation and `what-if`.
- Allow manual deploy for `dev` and `prod`, or a scoped deploy from `main`.

7. Add GitHub Actions app deployment workflows
- Deploy the app to `dev` automatically from `main`.
- Deploy the app to `prod` through a protected GitHub environment or manual approval.
- Use separate SWA deployment tokens for `dev` and `prod`.

8. Rewrite portfolio content around the Azure/DevOps transition
- Update hero, about, skills, projects, and contact messaging.
- Make the portfolio itself the main Azure case study.
- Emphasize Bicep, CI/CD, environment separation, and Azure hosting.

9. Add supporting documentation
- Document architecture, deployment flow, environments, and tradeoffs.
- Make the repo readable by a recruiter in a few minutes.

## Repo Structure
```text
.github/
  workflows/
    ci.yml
    infra.yml
    deploy-dev.yml
    deploy-prod.yml

app/
  public/
  src/
  package.json
  tsconfig.json
  webpack.config.js

infra/
  main.bicep
  modules/
    resource-group.bicep
    static-web-app.bicep
  params/
    dev.bicepparam
    prod.bicepparam
  README.md

docs/
  architecture.md
  cicd.md
  operations.md
  roadmap.md

staticwebapp.config.json
README.md
plans/
  plan.md
```

## Azure Resources
### Dev
- Resource group: `rg-portfolio-dev-we`
- Static Web App: `swa-portfolio-dev-we`

### Prod
- Resource group: `rg-portfolio-prod-we`
- Static Web App: `swa-portfolio-prod-we`

### Not Included In Phase 1
- Application Insights
- Log Analytics
- Key Vault
- ACR
- Container Apps
- App Service
- Functions
- Front Door

## Workflow Plan
### `ci.yml`
Purpose: validate code quality on pull requests and pushes.

Steps:
- Checkout
- Setup Node
- `npm ci` in `app/`
- `npm run lint`
- `npm run type-check`
- `npm run test`
- `npm run build`

### `infra.yml`
Purpose: validate and deploy Azure infrastructure.

Auth:
- GitHub OIDC with `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_SUBSCRIPTION_ID`

Steps:
- Checkout
- Azure login with OIDC
- Bicep validate
- Bicep `what-if`
- Deploy the selected environment using the matching `.bicepparam`

### `deploy-dev.yml`
Purpose: deploy the app to the dev Static Web App.

Trigger:
- Push to `main` after CI passes

Auth:
- Dev SWA deployment token stored in GitHub environment secrets

Steps:
- Checkout
- Setup Node
- `npm ci` in `app/`
- `npm run build`
- Deploy the built app to `swa-portfolio-dev-we`

### `deploy-prod.yml`
Purpose: promote the app to prod.

Trigger:
- Manual workflow dispatch or protected environment approval

Auth:
- Prod SWA deployment token stored in GitHub environment secrets

Steps:
- Checkout
- Setup Node
- `npm ci` in `app/`
- `npm run build`
- Deploy the built app to `swa-portfolio-prod-we`

## Testing Strategy
- Keep testing lightweight and credible.
- Required checks:
  - ESLint
  - TypeScript type-check
  - Production build
  - Small smoke test suite
- Suggested tooling:
  - Vitest
  - React Testing Library
  - `@testing-library/jest-dom`
- First test targets:
  - App renders without crashing
  - Main sections are present
  - Navigation links work
  - Any theme toggle or key interactive behavior works
- Explicitly out of scope for phase 1:
  - Playwright or Cypress
  - Large snapshot suites
  - Coverage gates
  - Broad visual regression testing

## Content Rewrite Goals
- Shift the narrative from general/full-stack marketing to Azure-focused delivery credibility.
- Replace Docker-first language with Azure Static Web Apps, Bicep, and GitHub Actions.
- Present the portfolio itself as a cloud/devops learning project with visible engineering discipline.
- Use grounded phrasing such as:
  - Built and deployed on Azure Static Web Apps
  - Provisioned with Bicep
  - Automated with GitHub Actions
  - Separate dev and prod environments
  - Transitioning into Junior Cloud/DevOps on Azure
- Remove or reduce:
  - Broad consulting language
  - Overstated seniority claims
  - Claims not backed by repo structure, workflows, or docs

## Definition Of Done
Phase 1 is complete when all of the following are true:
- The portfolio app remains under `app/` and builds successfully.
- `dev` and `prod` Static Web Apps exist in `West Europe`.
- Azure resources are provisioned from Bicep in `infra/`.
- GitHub Actions CI validates lint, type-check, tests, and build.
- GitHub Actions can deploy infrastructure with OIDC.
- GitHub Actions can deploy app content to both SWAs using separate deployment tokens.
- Site copy and README clearly position the repo as Azure-focused.
- Docker/Nginx are no longer the primary deployment story.
- Documentation explains architecture, environments, and deployment flow clearly enough for a recruiter or interviewer to follow quickly.

## Risks And Tradeoffs
- SWA Free keeps cost low but limits headroom and advanced features.
- Skipping App Insights keeps phase 1 simpler but reduces operational depth.
- Using SWA deployment tokens for app deploys is pragmatic, but not as elegant as full identity-based deployment.
- Separate `dev` and `prod` SWAs improve credibility, but add a small amount of config and secret management overhead.
- Keeping the stack frontend-only makes delivery faster, but provides less cloud depth than a full app with backend services.
- Replacing Docker as the primary story may leave old repo artifacts that need careful cleanup to avoid mixed signals.

## Phase 2 Ideas
- Add Application Insights and Log Analytics for basic observability.
- Add a small Azure-hosted backend aligned with existing .NET skills.
- Introduce branch-based preview workflows if the hosting model supports it cleanly.
- Add custom domain, HTTPS validation, and DNS documentation.
- Add richer operational docs such as rollback notes, incident notes, and runbooks.
- Add a second Azure project to show broader cloud capability beyond static hosting.
- Reintroduce Docker as a secondary, intentional story in a separate repo or supporting service, not as the flagship deployment path.
