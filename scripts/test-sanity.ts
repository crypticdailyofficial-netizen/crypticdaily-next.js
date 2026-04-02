// scripts/test-sanity.ts
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "h3ttcw0u",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function test() {
  const result = await client.fetch(`*[_type == "article"][0..2]`);
  console.log("Sanity connected ✅", result);
}

test();
