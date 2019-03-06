importScripts('/NuxtCryptoCalculator/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/NuxtCryptoCalculator/_nuxt/23e02bdfdd1cf79bc872.js",
    "revision": "f3516a64d3ae318c4fb8f47941762b6f"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/359d87aa730be45f5f6d.js",
    "revision": "0b2a5a04068595379cdaeab5419e97c1"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/e93b8d8702c48b84de5d.js",
    "revision": "45bad2e711862e0e8865d767f5505c9e"
  },
  {
    "url": "/NuxtCryptoCalculator/_nuxt/eeb4625d6115e3bc3d3d.js",
    "revision": "1ff34c9d77716e3c9770c4d8e31f6dba"
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
