# Infrastructure (Bicep)

## Structure

```text
infra/
  main.bicep
  modules/
    resource-group.bicep
    static-web-app.bicep
  params/
    dev.bicepparam
    prod.bicepparam
```

## Deployments

The root template deploys one environment at a time using a parameter file.

- Dev params: `infra/params/dev.bicepparam`
- Prod params: `infra/params/prod.bicepparam`

## Resources

- Dev RG: `rg-portfolio-dev-we`
- Dev SWA: `swa-portfolio-dev-we`
- Prod RG: `rg-portfolio-prod-we`
- Prod SWA: `swa-portfolio-prod-we`

## Region

- `westeurope`

## Local validation (optional)

```bash
az deployment sub validate --location westeurope --template-file infra/main.bicep --parameters infra/params/dev.bicepparam
az deployment sub what-if --location westeurope --template-file infra/main.bicep --parameters infra/params/dev.bicepparam
```
