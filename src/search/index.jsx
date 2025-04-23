import Service from '@/components/Shared/Service'
import { db } from '../../configs'
import { CarImages, Carlisting } from '../../configs/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import CarItem from '@/components/CarItem'
import Header from '@/components/Header'
import Search from '@/components/Search'

function SearchByOption() {
    const[carlist,setCarlist]=React.useState([])
    const [SearchParams]=useSearchParams()
    const cars=SearchParams.get("cars")
    const make=SearchParams.get("make")
    const price=SearchParams.get("price")
    console.log(cars,make,price)
    useEffect(()=>{
        getCarList()
    },[])
    const getCarList=async()=>{
        const result=await db.select().from(Carlisting).innerJoin(CarImages,eq(Carlisting.id,CarImages.carListingId)).where(cars!=""&& eq(Carlisting.condition,cars)).where(make!=""&& eq(Carlisting.make,make))
        const resp=Service.FormatResult(result)
        setCarlist(resp) 
    }   
  return (
    <div>
    <Header/>
    <div className='p-10 bg-black flex justify-center'>
      <Search/>
    </div>
    <div>
      
      {/* list of car */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20'>
      {
          carlist.map((car,index)=>(
              <div key={index} >
                  <CarItem car={car} />
              </div>
          ))
      }
      </div>
      
    </div>
  </div>
  )
}

export default SearchByOption
