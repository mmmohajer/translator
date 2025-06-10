module.exports = {
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },

  publicRuntimeConfig: {
    PRODUCTION: false,
    IS_STAGING_OR_DEVELOPMENT: true,
  },

  env: {
    WITH_DOCKER: 1,
    APP_DOMAIN: "APP_DOMAIN",
    TINY_CME_API_KEY: "TINY_CME_API_KEY",
    GOOGLE_AUTH_CLIENT_ID: "GOOGLE_AUTH_CLIENT_ID",
  },

  images: {
    domains: ["localhost", "makeclient.ngrok.io", "picsum.photos"],
  },
};
