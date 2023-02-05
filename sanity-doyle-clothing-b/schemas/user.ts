export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "userCart",
      title: "User Shopping Cart",
      type: "array",
      of: [{
        type: "document",
        fields: [
          {
            name: "cartProduct",
            title: "Cart Product",
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
      }]
    }
  ]
}