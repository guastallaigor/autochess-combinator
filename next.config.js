const withPWA = require("next-pwa");
module.exports = withPWA({
  pwa: {
    dest: "public",
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: "empty" };
    }

    return config;
  },
});
