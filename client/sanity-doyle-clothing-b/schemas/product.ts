export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Product Name",
      type: "string"
    },
    {
      name: "price",
      title: "Product Price",
      type: "string"
    },
    {
      name: "colour",
      title: "Product Colour",
      type: "string"
    },
    {
      name: "allColours",
      title: "Available colours",
      type: "array",
      of: [{ type: "string" }]
    },
    {
      name: "sex",
      title: "Sex Category",
      type: "string"
    },
    {
      name: "description",
      title: "Product Description",
      type: "string"
    },
    {
      name: "category",
      title: "Product Category",
      type: "string"
    },
    {
      name: "subCategory",
      title: "Product Sub Category",
      type: "string"
    },
    {
      name: "filter",
      title: "Sub Category Filter",
      type: "string"
    },
    {
      name: "image",
      title: "Product Image",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }}]
    },
  ]
}
