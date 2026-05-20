targetScope = 'subscription'

@description('Azure region for all resources.')
param location string = 'westeurope'

@description('Deployment environment name.')
@allowed([
  'dev'
  'prod'
])
param environment string

@description('Resource group name.')
param resourceGroupName string

@description('Static Web App name.')
param staticWebAppName string

@description('Optional tags applied to created resources.')
param tags object = {}

module resourceGroupModule './modules/resource-group.bicep' = {
  name: 'rg-${environment}'
  params: {
    name: resourceGroupName
    location: location
    tags: union(tags, {
      environment: environment
    })
  }
}

module staticWebApp './modules/static-web-app.bicep' = {
  name: 'swa-${environment}'
  scope: resourceGroup(resourceGroupName)
  params: {
    name: staticWebAppName
    location: location
    tags: union(tags, {
      environment: environment
    })
  }
  dependsOn: [
    resourceGroupModule
  ]
}

output staticWebAppDefaultHostname string = staticWebApp.outputs.defaultHostname
