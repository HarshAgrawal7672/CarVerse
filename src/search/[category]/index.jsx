import Header from '@/components/Header'
import Search from '@/components/Search'
import { CarImages, Carlisting } from '../../../configs/schema'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { eq } from 'drizzle-orm'
import { db } from '../../../configs'
import Service from '@/components/Shared/Service'
import CarItem from '@/components/CarItem'

function SearchByCategory() {
    const { category } = useParams()
    const [CarList, setCarList] = React.useState([])
    useEffect(() => {
        getcarlist()
    }, [category])

    const getcarlist = async () => {
        const result= await db.select().from(Carlisting).innerJoin(CarImages,eq(Carlisting.id,CarImages.carListingId)).where(eq(Carlisting.category,category))
        const resp=Service.FormatResult(result)
        setCarList(resp)
    }
  return (
    <div>
      <Header/>
      <div className='p-10 bg-black flex justify-center'>
        <Search/>
      </div>
      <div>
        <h2 className='font-bold text-3xl  mt-5 mb-6 p-10'>
            {category}
        </h2>
        {/* list of car */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-20'>
        {
            CarList.map((car,index)=>(
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

export default SearchByCategory
