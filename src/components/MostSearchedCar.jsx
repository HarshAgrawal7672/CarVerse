import React from "react";
import FakeData from "./Shared/FakeData";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function MostSearchedCar() {
  return (
    <div className="mx-24">
      <h2 className="font-bold text-3xl text-center my-16">
        Most Searched Car
      </h2>
      <Carousel>
        <CarouselContent className="">
        {FakeData.carList.map((car, index) =>(<CarouselItem className="basis-1/4">
            <CarItem car={car} />
        </CarouselItem>))}
          
        </CarouselContent>
        <CarouselPrevious />
      <CarouselNext />
      </Carousel>
      
    </div>
  );
}

export default MostSearchedCar;
