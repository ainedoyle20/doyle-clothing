import React from "react";

interface SidebarProps {
  setCategory(arg: string): void;
  setSubCategory(arg: string): void;
  category: string;
  subCategory: string;
}

const Sidebar: React.FC<SidebarProps> = ({ setCategory, setSubCategory, category, subCategory}) => {

  return (
    <div className="text-xl">Sidebar</div>
  )
}

export default Sidebar;
