import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Product, fetchProductDetails, fetchOtherProductColour } from "../../services/funcs";

const colourCodes = {
  black: "#000000",
  blue: "#0000ff",
  white: "#ffffff",
  beige: "#f9f9eb",
  grey: "#808080",
  turquoise: "#40e0d0"
}

type ObjectKey = keyof typeof colourCodes;

const DetailsContainer = () => {
  const { productId } = useParams();

  const [productDetails, setProductDetails] = useState<Product>();

  useEffect(() => {
    if (!productId) return;

    const getProductDetails = async () => {
      const details = await fetchProductDetails(productId);
      setProductDetails(details);
    }

    getProductDetails();
  }, [])

  const handleColourClicked = async (selectedColour: string) => {
    if (!productDetails ) return;

    const details = await fetchOtherProductColour(productDetails.name, selectedColour);
    setProductDetails(details);
  }

  return (
    <div className="w-screen min-h-screen flex">
      <div className="w-full mr-[350px] flex flex-col">
        <div className="w-full  px-2 grid grid-cols-2 gap-2 pt-20">
          {productDetails ? (
            productDetails.image.slice(0, 2).map((image) => (
              <img 
                key={image._key}
                alt="product image"
                src={image.asset.url}
                className="h-[460px] w-[300px]"
              />
            ))
          ) : 
          null}
        </div>

        <div className="w-full p-3">
          <span>Descriptions</span>
        </div>

        <div className="w-full px-2 grid grid-cols-2 gap-2 pb-20">
          {productDetails ? (
            productDetails.image.slice(2, 4).map((image) => (
              <img 
                key={image._key}
                alt="product image"
                src={image.asset.url}
                className="h-[460px] w-[300px]"
              />
            ))
          ) : 
          null}
        </div>
      </div>

      <div className="shadow-md w-[350px] h-screen fixed top-0 right-0 pt-28 px-2 flex flex-col gap-5">
        {productDetails ? (
        <>
          <span className="font-black">{productDetails?.name}</span>

          <div className="flex flex-col gap-1 w-full">
            <span>{`${productDetails?.colour[0].toUpperCase()}${productDetails?.colour.slice(1, 10)}`}</span>
            <div className="flex items-center gap-1 w-full">
              {productDetails?.allColours.map(colour => (
                  <span 
                    key={colour}
                    className={`${productDetails?.colour === colour ? "border-[1px] border-black w-4 h-4" : "w-3 h-3"} rounded-full shadow-md flex justify-center items-center`}
                  >
                    <span 
                      style={{
                        width: "0.75rem",
                        height: "0.75rem",
                        borderRadius: "100%",
                        backgroundColor: `${colourCodes[colour as ObjectKey]}`,
                        cursor: "pointer"
                      }}
                      onClick={() => handleColourClicked(colour)}
                    ></span>
                  </span>
                )
              )}
            </div>
          </div>

          {/* Select Size Dropdown */}
          <div></div>
        </>
        ) : (
          null
        )}
      </div>
    </div>
  )
}

export default DetailsContainer;
