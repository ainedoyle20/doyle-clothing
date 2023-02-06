import React, { useState } from 'react';
import { GrClose } from "react-icons/gr";

const colourCodes = {
  black: "#000000",
  blue: "#0000ff",
  white: "#ffffff",
  beige: "#f9f9eb",
  grey: "#808080",
  turquoise: "#40e0d0",
  pink: "#ffc0cb",
  purple: "#800080"
}

type ColourKey = keyof typeof colourCodes;

interface ColoursProps {
  selectedColour: string;
  setSelectedColour(arg: string): void;
}

const Colours: React.FC<ColoursProps> = ({ selectedColour, setSelectedColour }) => {
  const [colours, setColours] = useState(["black", "blue", "white", "grey", "turquoise", "beige", "pink", "purple"]);

  return (
    <div className='flex items-center gap-2'>
      {colours.map(colour => (
        <div key={colour} className={`${selectedColour === colour ? "border-[1px] border-black" : ""} w-[22px] h-[22px] flex justify-center items-center`}>
          <span 
            style={{
              height: "18px",
              width: "18px",
              backgroundColor: `${colourCodes[colour as ColourKey]}`,
              cursor: "pointer",
            }}
            onClick={() => setSelectedColour(colour)}
          />
        </div>
      ))}

      <span className='text-lg cursor-pointer ml-1' onClick={() => setSelectedColour("")}>
        <GrClose />
      </span>
    </div>
  )
}

export default Colours;
