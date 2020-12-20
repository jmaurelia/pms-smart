const pkg = require("./package.json");
const pwa = {
  name: "PMS Webapp",
  themeColor: "#6c757d",
  msTileColor: "#ffffff",
  assetsVersion: pkg.version,
  iconPaths: {
    favicon32: "img/icons/favicon-32x32.png",
    favicon16: "img/icons/favicon-16x16.png",
    appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
    msTileImage: "img/icons/msapplication-icon-144x144.png",
  },
};
module.exports = {
  configureWebpack: {
    plugins: [],
    optimization: {},
  },
  devServer: {
    disableHostCheck: true,
  },
  pwa: {
    ...pwa,
    manifestOptions: {
      name: pwa.name,
      short_name: pwa.name,
      start_url: ".",
      display: "standalone",
      theme_color: pwa.themeColor,
      background_color: pwa.msTileColor,
      permissions: ["file://*/*"],
    },
    workboxPluginMode: "InjectManifest",
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'service-worker.js',
    },
  },
};
