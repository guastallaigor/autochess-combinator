module.exports = {
  images: {
    domains: ["static.ilongyuan.cn"],
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = { fs: "empty" };
    }

    return config;
  },
};
