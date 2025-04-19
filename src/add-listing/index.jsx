import Header from "@/components/Header";
import React, { useState } from "react";
import carDetails from "../components/Shared/carDetails.json";
import InputField from "./components/InputField";
import Dropdown from "./components/Dropdown";
import TextAreaField from "./components/TextAreaField";
import UploadImages from "./components/UploadImages";
import { Separator } from "@/components/ui/separator";
import features from "../components/Shared/features.json";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { db } from "../../configs";
import { Carlisting } from "../../configs/schema";

function AddListing() {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    
  };
  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(featuresData);
  }

  const onSubmit=async (e)=>{
    e.preventDefault();
    console.log(formData);
   
    try {
      const result= await db.insert(Carlisting).values({
        ...formData,
        features:featuresData
      }
      );
      if(result){
        alert("Listing added successfully")
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  return (
    <div>
      <Header />
      <div className="px10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10" onSubmit={onSubmit}>
          {/* car detaiils */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm">
                    {item?.label}
                    {item.required && <span className="text-red-600">*</span>}
                  </label>
                  {item.fieldType === "text" || item.fieldType === "number" ? (
                    <InputField
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <Dropdown
                      item={item}
                      handleInputChange={handleInputChange}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField item={item} handleInputChange={handleInputChange} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6" />
          {/* features list */}
          <div>
            <h2 className="font-medium text-xl my-6">Features</h2>
            <div className=" grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.features.map((item, index) => (
                <div className="flex gap-2 items-center" key={index}>
                  <Checkbox onCheckedChange={(e)=>handleFeaturesChange(item.name,e)} /> <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* car images */}
          <Separator className="my-6" />
          <UploadImages/>
          <div className="mt-10 flex justify-end">
            <Button type="submit" > Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
