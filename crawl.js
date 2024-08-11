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

async function crawlPage(baseURL, currentURL, pages) {
  try {
    const { hostname: baseHost } = new URL(baseURL);
    const { hostname: currentHost } = new URL(currentURL);

    if (baseHost !== currentHost) {
      return pages
    }

    const normalizedCurrentURL = normalizeURL(currentURL)

    if (normalizedCurrentURL in pages) {
      pages[normalizedCurrentURL]++;
      return pages
    }

    pages[normalizedCurrentURL] = 1

    const htmlBody = await fetchAndParse(currentURL)
    const urls = getURLsFromHTML(htmlBody, baseURL)

    for (const url of urls) {
      await crawlPage(baseURL, url, pages)
    }

    return pages

  } catch (err) {
    throw err
  }
}

async function fetchAndParse(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("text/html")) {
      console.warn(`${url} - invalid content type: expected text/html`)
    }

    const htmlBody = await response.text();

    return htmlBody;
  } catch (err) {
    throw err
  }
}


export {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
};
