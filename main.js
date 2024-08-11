import { normalizeURL, crawlPage } from "./crawl.js";

function main() {
  const args = process.argv.slice(2);

  if (args.length !== 1) {
    console.error(`invalid number of arguments: required 1, provided ${args.length}`);
    return;
  }

  try {
    const url = new URL(args[0]);

    console.log(` *** Crawler is starting at ${url} *** `);

    crawlPage(url, url, {}).then(pages => {
      console.log(pages)
    });

  } catch (err) {
    console.error(err.message);
  }
}



main();
