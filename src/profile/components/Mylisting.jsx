import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import { CarImages, Carlisting } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import Service from "@/components/Shared/Service";
import CarItem from "@/components/CarItem";
import { FaTrash } from "react-icons/fa";
function Mylisting() {
  const [carList, setCarList] = React.useState([]);
  const { user } = useUser();
  useEffect(() => {
    user && GetUserCarListing();
  }, [user]);
  const GetUserCarListing = async () => {
    const result = await db
      .select()
      .from(Carlisting)
      .leftJoin(CarImages, eq(Carlisting.id, CarImages.carListingId))
      .where(eq(Carlisting.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Carlisting.id));

    const resp = Service.FormatResult(result);
    console.log(resp);
    setCarList(resp);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to="/add-listing">
          <Button> + Add New Listing</Button>
        </Link>
      </div>
      <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="flex justify-between items-center mt-2 bg-gray-50 rounded-lg p-2">
              <Link className="w-full" to={`/add-listing?mode=edit&id=${item.id}`}>
                <Button variant="outline" className="w-full">
                  Edit
                </Button>
              </Link>
              <Button variant="destructive" className="bg-white">
                <FaTrash className="text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mylisting;
