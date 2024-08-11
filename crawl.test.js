import { describe, test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

describe("normalizeURL testing", () => {
  test("should normalize URLs with trailing slashes", () => {
    const testCases = [
      "https://blog.boot.dev/path/",
      "https://blog.boot.dev/path",
      "http://blog.boot.dev/path/",
      "http://blog.boot.dev/path"
    ];

    testCases.forEach(ts => {
      expect(normalizeURL(ts)).toBe("blog.boot.dev/path")
    });
  });

  test("should handle URLs without path", () => {
    const testCases = [
      "http://example.com/",
      "https://example.com"
    ];

    testCases.forEach(ts => {
      expect(normalizeURL(ts)).toBe("example.com")
    });
  });

  test("should handle edge cases", () => {
    const url1 = "https://example.com/";
    const url2 = "https://example.com/path/to/page";
    const url3 = "http://example.com/path/to/page";

    expect(normalizeURL(url1)).toBe("example.com");
    expect(normalizeURL(url2)).toBe("example.com/path/to/page");
    expect(normalizeURL(url3)).toBe("example.com/path/to/page");
  });
});


describe("getURLsFromHTML testing", () => {
  test("should return 5 absolute URLs", () => {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Test HTML for URL Normalization</title>
      </head>
      <body>
          <h1>Test Links</h1>
          <ul>
              <li><a href="https://example.com/path/to/resource/">Absolute URL with trailing slash</a></li>
              <li><a href="https://example.com/path/to">Absolute URL without trailing slash</a></li>
              <li><a href="/path/to/resource/">Relative URL with trailing slash</a></li>
              <li><a href="/path/to/resource">Relative URL without trailing slash</a></li>
              <li><a href="http://sub.example.com/another/path">Another absolute URL</a></li>
          </ul>
      </body>
      </html>
    `;

    const urls = [
      "https://example.com/path/to/resource/",
      "https://example.com/path/to",
      "https://example.com/path/to/resource/",
      "https://example.com/path/to/resource",
      "http://sub.example.com/another/path"
    ];

    expect(getURLsFromHTML(html, "https://example.com").length).toBe(5);
    expect(getURLsFromHTML(html, "https://example.com")).toStrictEqual(urls)
  });
});



