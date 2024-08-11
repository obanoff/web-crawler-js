import { JSDOM } from "jsdom"

function normalizeURL(url) {
  try {
    const { hostname, pathname } = new URL(url);

    const normalizedPath = pathname.replace(/\/+$/, "");

    return `${hostname}${normalizedPath}`;
  } catch (err) {
    throw new Error("invalid url");
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  try {
    const dom = new JSDOM(htmlBody);

    const anchorElements = Array.from(dom.window.document.querySelectorAll("a[href]"));

    const absoluteURLs = anchorElements.map(a => {
      return new URL(a.href, baseURL).href;
    });

    return absoluteURLs;
  } catch (err) {
    throw new Error(`failed to extract URLs: ${err.message}`);
  }
}

export {
  normalizeURL,
  getURLsFromHTML
};
