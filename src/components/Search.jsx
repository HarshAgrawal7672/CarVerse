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
import { Link } from "react-router-dom";


function Search() {
  const [cars, setCars] = React.useState([]);
  const [carMakes, setCarMakes] = React.useState([]);
  const [pricing, setPricing] = React.useState([]);

  return (
    <div className="p-2 md:p-5 bg-white flex  rounded-full flex-col  md:flex-row md:gap-10  gap-5 px-5 items-center w-[90%] ">
      <Select onValueChange={(value) => setCars(value)}>
        <SelectTrigger className=" outline-none md:border-none md:w-full shadow-none text-lg">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="New">New</SelectItem>
          <SelectItem value="Used">Used</SelectItem>
          
        </SelectContent>
      </Select >
      <Separator orientation="vertical" className="hidden md:block"/>
      <Select onValueChange={(value) => setCarMakes(value)}>
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
      <Select onValueChange={(value) => setPricing(value)}>
        <SelectTrigger className="outline-none md:border-none md:w-full shadow-none text-lg">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
        {Data.Pricing.map((price,index)=>(
                    <SelectItem value={price.amount}>{price.amount}</SelectItem>
            ))}
        </SelectContent>
      </Select>
      <Link to={`/search?cars=${cars}&make=${carMakes}&price=${pricing}`}>
      <FaSearch className="text-[30px] md:text-[50px] bg-primary rounded-full p-1 md:p-3  text-white hover:scale-105 transition-all cursor-pointer" / >
      </Link>

    </div>
  );
}

export default Search;
