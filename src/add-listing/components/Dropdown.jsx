import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Dropdown({ item, handleInputChange, carInfo }) {
  return (
    <div>
      <Select
      value={carInfo?.[item?.name]}
        onValueChange={(value) => handleInputChange(item.name, value)}
        required={item.required}
      >
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              carInfo?.[item?.name] ? carInfo?.[item?.name] : item.label
            }
          />
        </SelectTrigger>
        <SelectContent>
          {item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Dropdown;
