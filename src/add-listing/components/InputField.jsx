import { Input } from '@/components/ui/input'
import React from 'react'

function InputField({item,handleInputChange,carInfo}) {
  return (
    <div>
      <Input type={item?.fieldType} name={item?.name} required={item?.required}
      onChange={(e)=>handleInputChange(item.name,e.target.value)}
      defaultValue={carInfo?.[item.name]}
      />
    </div>
  )
}

export default InputField
