const url = 'http://localhost:8080';

export const environment = {
  production: false,
  apiUrl: url,

  tokenWhitelistedDomains: [
    new RegExp('localhost:8080')
  ],

tokenBlacklistedRoutes: [
  new RegExp('\/oauth\/token')
]

};
