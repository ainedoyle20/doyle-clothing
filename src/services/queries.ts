export const productsQuery = (gender: string): string  => {
  const query = 
  `*[_type == "product" && sex == "${gender}"]{
    _id,
    name,
    colour,
    allColours,
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

export const productDetailsQuery = (id: string): string => {
  const query = `*[_type == "product" && _id == "${id}"]{
    _id,
    name,
    colour,
    allColours,
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

export const otherColourQuery = (name: string, colour: string ): string => {
  const query =
  `*[_type == "product" && name == "${name}" && colour == "${colour}"]{
    _id,
    name,
    colour,
    allColours,
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