import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

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


