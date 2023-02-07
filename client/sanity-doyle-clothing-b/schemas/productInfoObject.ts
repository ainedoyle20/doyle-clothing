export default {
  title: "Product Count and Size",
  name: "productInfoObject",
  type: "object",
  fields: [
    {
      type: "number",
      name: "sortingNum",
      title: "Number for sorting"
    },
    {
      name: "storedProduct",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }]
    },
    {
      name: "count",
      title: "Product Count",
      type: "number"
    },
    {
      name: "size",
      title: "Product Size",
      type: "string"
    }
  ]
}
