import React from "react";

import Category from "./Category";

const categories = [
  {
    mainCategory: "View All",
    subCategories: []
  },
  {
    mainCategory: "Hoodies & Sweatshirts",
    subCategories: ["Hoodies", "Sweatshirts"]
  },
  {
    mainCategory: "Trousers",
    subCategories: ["Chinos", "Smart", "Cargos", "Joggers"]
  },
  {
    mainCategory: "Jackets & Coats",
    subCategories: ["Coats", "Puffer Jackets", "Bomber Jackets", "Biker Jackets", "Denim Jackets"]
  },
  {
    mainCategory: "Tops",
    subCategories: ["T-shirts", "Polo shirts", "Jersey Tops"]
  },
  {
    mainCategory: "Jeans",
    subCategories: ["Slim Jeans", "Skinny Jeans", "Regular Jeans", "Loose Jeans"]
  },
  {
    mainCategory: "Shoes",
    subCategories: ["Boots", "Trainers", "Smart", "Loafers", "Slippers"]
  },
  {
    mainCategory: "Sportswear",
    subCategories: ["Tops", "Bottoms", "Shorts", "Jackets", "Leggings"]
  },
];

interface SidebarProps {
  setCategory(arg: string): void;
  setSubCategory(arg: string): void;
  category: string;
  subCategory: string;
  setSearchTerm(arg: string): void;
  setSelectedColour(arg: string): void;
}

const Sidebar: React.FC<SidebarProps> = ({ setCategory, setSubCategory, category, subCategory, setSearchTerm, setSelectedColour}) => {

  return (
    <div 
      className="
      fixed
      top-0
      shadow-md
      min-h-screen w-[200px]
      py-2 px-2
      flex flex-col gap-5
      pt-24
      "
    >
      {categories.map(section => (
        <Category 
          key={section.mainCategory}
          section={section}
          category={category}
          subCategory={subCategory}
          setCategory={setCategory}
          setSubCategory={setSubCategory}
          setSearchTerm={setSearchTerm}
          setSelectedColour={setSelectedColour}
        />
      ))}

      <div className="flex flex-col gap-3 w-full text-[10px] mt-[200px]">
        <span>All products can be found on the H&M website.</span>
        <a href="https://www2.hm.com/" target="_blank" className="underline cursor-pointer">H & M Website</a>
      </div>
    </div>
  );
}

export default Sidebar;
