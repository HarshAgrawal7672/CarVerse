import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
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
import { CarImages, Carlisting } from "../../configs/schema";
import { useUser } from "@clerk/clerk-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { eq } from "drizzle-orm";
import Service from "@/components/Shared/Service";

function AddListing() {
  const [formData, setFormData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [carInfo, setCarInfo] = useState([]);
  const [searchParams]=useSearchParams()
  const {user}=useUser()

  const mode = searchParams.get("mode");
  const recordId = searchParams.get("id");

  useEffect(() => {
    if(mode === "edit") {
      GetlistingDetails();
    }
  }, []);

  const GetlistingDetails=async () => {
    const result = await db
      .select()
      .from(Carlisting)
      .innerJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .where(eq(Carlisting.id, recordId))
      

      const resp= Service.FormatResult(result);
    console.log("here:",resp);
    setCarInfo(resp[0]);
    setFormData(resp[0]);
    setFeaturesData(resp[0]?.features);
  }


  const handleInputChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(featuresData);
  };

  const onSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    console.log(formData);
    if(mode === "edit") {
      const result= await db.update(Carlisting).set({
        ...formData,
        features: featuresData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: new Date().toISOString(),
      }).where(eq(Carlisting.id,recordId))
      .returning({ id: Carlisting.id });

      console.log(result);
      
      if (result) {
        setImages(result[0]?.id);
        setLoader(false);
        
      }

    }else{
      try {
        const result = await db
          .insert(Carlisting)
          .values({
            ...formData,
            features: featuresData,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: new Date().toISOString(),
          })
          .returning({ id: Carlisting.id });
        if (result) {
          setImages(result[0]?.id);
          setLoader(false);
          
        }
      } catch (error) {
        console.log(error);
      }
    }
    
  };

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
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "dropdown" ? (
                    <Dropdown
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
                  ) : item.fieldType === "textarea" ? (
                    <TextAreaField
                      item={item}
                      handleInputChange={handleInputChange}
                      carInfo={carInfo}
                    />
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
                  <Checkbox
                    onCheckedChange={(e) => handleFeaturesChange(item.name, e)}
                    checked={featuresData?.[item.name]} 
                  />{" "}
                  <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          {/* car images */}
          <Separator className="my-6" />
          <UploadImages
            images={images}
            carInfo={carInfo}
            mode={mode}
           
          />

          <div className="mt-10 flex justify-end">
            <Button disabled={loader} type="submit">
              {console.log(loader)}
              {loader ? "Loading..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddListing;
