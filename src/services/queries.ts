export const productsQuery = (gender: string): string  => {
  const query = 
  `*[_type == "product" && sex == "${gender}"]{
    _id,
    name,
    colour,
    price,
    sex,
    category,
    subCategory,
    filter,
    image[]{
      _key,
      asset->{
        url
      }
    }
  }`;

  return query;
}