export default {
  name: "cartProduct",
  title: "Cart Product",
  type: "document",
  fields: [
    {
      name: "product",
      title: "Cart Product",
      type: "reference",
      to: [{ type: "product" }]
    },
    {
      name: "count",
      title: "Product Count",
      type: "number"
    }
  ]
}
