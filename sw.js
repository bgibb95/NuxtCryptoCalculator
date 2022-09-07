importScripts('/NuxtCryptoCalculator/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/NuxtCryptoCalculator/_nuxt/359d87aa730be45f5f6d.js",
    "revision": "0b2a5a04068595379cdaeab5419e97c1"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/7e806988f9e54878fca5.js",
    "revision": "211925568d7e2ce8f8c1335d87714479"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/887c2c2eb187f743802a.js",
    "revision": "9a0b032ae202ed4c5beff8c7ae5b4dc3"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/c6f9bcfc0aef46d945a2.js",
    "revision": "bd7f4bf0fb813c59f0096c001477e9dc"
  }
], {
  "cacheId": "nuxtcryptocalculator",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/NuxtCryptoCalculator/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/NuxtCryptoCalculator/.*'), workbox.strategies.networkFirst({}), 'GET')
