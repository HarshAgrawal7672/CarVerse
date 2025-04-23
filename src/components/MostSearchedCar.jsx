import React, { useEffect } from "react";
import FakeData from "./Shared/FakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Carlisting, CarImages } from "../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "../../configs";
import Service from "./Shared/Service";
function MostSearchedCar() {
  const [carList, setCarList] = React.useState([]);

  useEffect(() => {
    GetPopularCarListing()
  },[])
  const GetPopularCarListing = async () => {
    const result = await db
      .select()
      .from(Carlisting)
      .leftJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .orderBy(desc(Carlisting.id))
      .limit(10); 

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
  };
  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched Car
      </h2>
      <Carousel>
        <CarouselContent className="">
          {carList.map((car, index) => (
            <CarouselItem key={index} className="basis-1/4">
              <CarItem car={car} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export default MostSearchedCar;
