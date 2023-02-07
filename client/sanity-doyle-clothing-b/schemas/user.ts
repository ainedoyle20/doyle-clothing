export default {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    {
      name: "email",
      title: "User Email",
      type: "string"
    },
    {
      name: "cartItems",
      title: "Cart Items",
      type: "array",
      of: [{ type: "productInfoObject"}]
    },
    {
      name: "orders",
      title: "User Orders History",
      type: "array",
      of: [{
        name: "order",
        type: "object",
        fields: [
          {
            type: "number",
            name: "sortingNum",
            title: "Number for sorting"
          },
          {
            type: "string",
            name: "orderDate",
            title: "Order Date"
          },
          {
            type: "number",
            name: "totalCost",
            title: "Total Cost"
          },
          {
            name: "products",
            title: "Ordered Products",
            type: "array",
            of: [{ type: "productInfoObject"}]
          },
        ]
      }]
    }
  ]
}