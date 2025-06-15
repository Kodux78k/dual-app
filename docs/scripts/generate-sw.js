const { generateSW } = require("workbox-build");

generateSW({
  swDest: "docs/_site/service-worker.js",
  globDirectory: "docs/_site",
  globPatterns: [
    "**/*.{html,js,css,webp,jpeg,png,json}"
  ],
  runtimeCaching: [{
    urlPattern: /\.(?:png|jpg|jpeg|webp|svg)$/,
    handler: "CacheFirst",
    options: { cacheName: "images-cache", expiration: { maxEntries: 50 } }
  },{
    urlPattern: new RegExp("https://fonts\\.googleapis\\.com/"),
    handler: "StaleWhileRevalidate",
    options: { cacheName: "google-fonts-stylesheets" }
  }]
}).then(({ count, size }) => {
  console.log(`Generated SW, precached ${count} files, ${size} bytes.`);
});
