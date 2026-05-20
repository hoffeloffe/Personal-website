using '../main.bicep'

param environment = 'dev'
param location = 'westeurope'
param resourceGroupName = 'rg-portfolio-dev-we'
param staticWebAppName = 'swa-portfolio-dev-we'
param tags = {
  project: 'portfolio'
  owner: 'github-actions'
}
