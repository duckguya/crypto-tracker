const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://duckguya-kr.github.io",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
};
