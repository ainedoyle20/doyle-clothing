import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "wsqh0qds",
  dataset: "production",
  apiVersion: "2023-01-31",
  useCdn: false,
  token: import.meta.env.VITE_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
