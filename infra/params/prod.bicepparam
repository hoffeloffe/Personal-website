using '../main.bicep'

param environment = 'prod'
param location = 'westeurope'
param resourceGroupName = 'rg-portfolio-prod-we'
param staticWebAppName = 'swa-portfolio-prod-we'
param tags = {
  project: 'portfolio'
  owner: 'github-actions'
}
