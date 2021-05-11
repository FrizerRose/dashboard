// vue.config.js file to be place in the root of your repository

module.exports = {
  outputDir: 'dist2',
  publicPath: process.env.NODE_ENV === 'production'
    ? './'
    : '/',
  pwa: {
    name: 'Dolazim.hr',
    themeColor: '#ffffff',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestPath: './img/icons/site.webmanifest',

    // // configure the workbox plugin
    // workboxPluginMode: 'InjectManifest',
    // workboxOptions: {
    //   // swSrc is required in InjectManifest mode.
    //   swSrc: 'dev/sw.js',
    //   // ...other Workbox options...
    // },

  },
};
