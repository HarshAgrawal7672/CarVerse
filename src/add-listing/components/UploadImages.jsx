import React from 'react'

function UploadImages() {
  return (
    <div>
        <h2 className="font-medium text-xl my-3">Upload car images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        <label htmlFor="upload-images" >
            <div className="border rounded-xl border-dotted border-primary bg-blue-50 p-10 cursor-pointer flex flex-col items-center justify-center hover:bg-blue-100 transition-all duration-200 ease-in-out">
                <h2 className="text-lg text-center">+</h2>
            </div>
        </label>
        <input className="opacity-0" type="file" multiple={true} id="upload-images" />
      </div>
    </div>
  )
}

export default UploadImages
