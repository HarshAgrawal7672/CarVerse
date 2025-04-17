import React from "react";
import { FaSearch } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator"
import Data from "./Shared/Data";


function Search() {
  return (
    <div className="p-2 md:p-5 bg-white flex  rounded-full flex-col  md:flex-row md:gap-10  gap-5 px-5 items-center w-[90%] ">
      <Select>
        <SelectTrigger className=" outline-none md:border-none md:w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Old">Old</SelectItem>
          
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block"/>
      <Select>
        <SelectTrigger className="outline-none md:border-none md:w-full shadow-none text-lg">
          <SelectValue placeholder="Car Makes" />
        </SelectTrigger>
        <SelectContent>
            {Data.CarMakes.map((maker,index)=>(
                    <SelectItem value={maker.name}>{maker.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block"/>
      <Select>
        <SelectTrigger className="outline-none md:border-none md:w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
        {Data.Pricing.map((price,index)=>(
                    <SelectItem value={price.amount}>{price.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <div>
      <FaSearch className="text-[30px] md:text-[50px] bg-primary rounded-full p-1 md:p-3  text-white hover:scale-105 transition-all cursor-pointer" / >
      </div>

    </div>
  );
}

export default Search;
