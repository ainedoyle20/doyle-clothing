import React from "react";

interface CategoryProps {
  section: {mainCategory: string; subCategories: string[]};
  setCategory(arg: string): void;
  setSubCategory(arg: string): void;
  category: string;
  subCategory: string;
}

const Category: React.FC<CategoryProps> = ({ section, category, subCategory, setCategory, setSubCategory }) => {
  return (
    <div 
      className={`
        ${category ===  section.mainCategory.toLowerCase()
        ? "h-auto" 
        : "h-[24px]"}
        flex flex-col w-full overflow-hidden
        `
        }>
        <div 
          className={`${category === section.mainCategory.toLowerCase() ? "border-b-[1px] border-black": ""} text-md cursor-pointer`} 
          onClick={() => {
            setCategory(section.mainCategory.toLowerCase());
            setSubCategory("");
          }}>
          {section.mainCategory}
        </div>
        <div className="flex flex-col gap-1 pl-2 pt-1 cursor-pointer text-sm">
          {section.subCategories.map((subC, idx) => (
            <span key={`${subC}-${idx}`}
              className={`${subC.toLowerCase() === subCategory ? "border-b-[1px] border-black" : ""} w-3/4`}
              onClick={() => setSubCategory(subC.toLowerCase())}
            >
              {subC}
            </span>
          ))}
        </div>
    </div>
  )
}

export default Category;
