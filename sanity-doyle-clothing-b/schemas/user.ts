import product from "./product";

export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "userId",
      title: "User Id",
      type: "string"
    },
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
          }          
        ]
      }]
    }
  ]
}