export const productsQuery = (gender: string): string  => {
  const query = 
  `*[_type == "product" && sex == "${gender}"]{
    _id,
    name,
    colour,
    allColours,
    price,
    sex,
    description,
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
    description,
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
    description,
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

export const userProfileQuery = (id: string): string => {
  const query = `
  *[_type == "user" && _id == "${id}"]{
    _id,
    cartItems[]{
      _key,
      count,
      size,
      sortingNum,
      storedProduct->{
        _id,
        name,
        image[]{
          _key,
          asset->{
            url
          }
        },
        price,
        colour
      }
    },
    orders[]{
      _key,
      sortingNum,
      orderDate,
      totalCost,
      products[]{
        _key,
        count,
        size,
        storedProduct->{
          _id,
          name,
          image[]{
            _key,
            asset->{
              url
            }
          },
          price,
          colour
        }
      }
    }
  }
  `;

  return query;
}
