export function printReport(pages) {
  console.log("\n *** Report is starting *** \n");

  const entries = Object.entries(pages);

  entries.sort((a, b) => {
    return b[1] - a[1]
  });

  for (const entry of entries) {
    console.log(`Found ${entry[1]} internal links to ${entry[0]}`);
  }

  console.log("\n *** End of the report *** \n");
}
