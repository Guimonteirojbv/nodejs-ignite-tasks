import { parse } from "csv-parse";
import fs from "node:fs";

const pathcsv = new URL("./csvnodejs.csv", import.meta.url);

const stream = fs.createReadStream(pathcsv);

const csvParser = parse({
  delimiter: ",",
  fromLine: 2,
  skip_empty_lines: true,
});

async function run() {
  const linesParser = stream.pipe(csvParser);

  for await (const line of linesParser) {
    const [title, description] = line;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }
}

run();
