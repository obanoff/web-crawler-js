function normalizeURL(url) {
  try {
    const { hostname, pathname } = new URL(url);

    const normalizedPath = pathname.replace(/\/+$/, "");

    return `${hostname}${normalizedPath}`;
  } catch (err) {
    throw new Error("invalid url")
  }

}

export {
  normalizeURL
};
