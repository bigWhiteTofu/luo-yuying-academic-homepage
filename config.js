window.SITE_CONFIG = {
  apiBase: ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? ""
    : "https://luo-api.aiecnu.site",
  adminApiBase: ["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? ""
    : "https://luo-yuying-academic-api.xdx555.chatgpt.site"
};
