import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "wsqh0qds",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN
});
