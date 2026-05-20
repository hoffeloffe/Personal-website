targetScope = 'resourceGroup'

@description('Static Web App name.')
param name string

@description('Azure region for the Static Web App.')
param location string

@description('SWA SKU tier.')
@allowed([
  'Free'
  'Standard'
])
param skuTier string = 'Free'

@description('SWA SKU name.')
@allowed([
  'Free'
  'Standard'
])
param skuName string = 'Free'

@description('Optional tags for the Static Web App.')
param tags object = {}

resource staticWebApp 'Microsoft.Web/staticSites@2023-12-01' = {
  name: name
  location: location
  sku: {
    name: skuName
    tier: skuTier
  }
  tags: tags
  properties: {
    publicNetworkAccess: 'Enabled'
  }
}

output defaultHostname string = staticWebApp.properties.defaultHostname
