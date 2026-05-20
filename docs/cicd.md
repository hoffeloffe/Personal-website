# CI/CD

## Workflows

### `ci.yml`

Runs on pushes and pull requests to `main`.

In `app/` it executes:

1. `npm ci`
2. `npm run lint`
3. `npm run type-check`
4. `npm run test`
5. `npm run build`

### `infra.yml`

Runs infra validation on pushes touching `infra/**`, and supports manual deployment.

- Auth: GitHub OIDC via repository variables:
  - `AZURE_CLIENT_ID`
  - `AZURE_TENANT_ID`
  - `AZURE_SUBSCRIPTION_ID`
- Commands:
  - `az deployment sub validate`
  - `az deployment sub what-if`
  - `az deployment sub create` (manual dispatch)
- Parameter files:
  - `infra/params/dev.bicepparam`
  - `infra/params/prod.bicepparam`

### `deploy-dev.yml`

Automatically deploys to dev after `CI` succeeds on `main`.

- Trigger: `workflow_run` from `CI`
- Environment: `dev`
- Secret required: `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`

### `deploy-prod.yml`

Manual deployment to prod.

- Trigger: `workflow_dispatch`
- Environment: `prod` (protect in GitHub Environments)
- Secret required: `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`

## Deprecated Workflow

- `docker-build-push.yml` is intentionally deprecated and manual-only.
