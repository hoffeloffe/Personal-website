# Operations

## Required GitHub Configuration

### Repository Variables (OIDC)

- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_SUBSCRIPTION_ID`

### Environment Secrets

- Environment `dev`:
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_DEV`
- Environment `prod`:
  - `AZURE_STATIC_WEB_APPS_API_TOKEN_PROD`

### Recommended Environment Protection

- Require reviewers for `prod`
- Restrict who can deploy to `prod`

## Day-2 Runbook

### Infra validation only

Run `Infra` workflow on push to `main` with infra changes.

### Infra deployment

Run `Infra` manually and pick `dev` or `prod`.

### App deployment

- Dev deploys automatically from `main` after CI succeeds.
- Prod deploys manually via `Deploy Prod` workflow.

## Rollback

- For app regressions, re-run `Deploy Prod` with a known-good git SHA.
- For infra regressions, run `Infra` with the previous commit's Bicep/params.
