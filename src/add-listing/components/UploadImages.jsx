import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../configs/firebaseConfig";
import { db } from "../../../configs";
import { useState } from "react";
import { CarImages } from "../../../configs/schema";
function UploadImages({ images  }) {
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  useEffect(() => {
    console.log("images", images);
    if (images) {
      UploadImagesToServer();
    }
  }, [images]);

  const onFileSelected = (e) => {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFiles((prevFiles) => [...prevFiles, file]);
    }
  };
  const onImageRemove = (image, index) => {
    const result = selectedFiles.filter((item) => item != image);
    setSelectedFiles(result);
  };
  const UploadImagesToServer = async () => {

    selectedFiles.forEach(async (file) => {
      const fileName = Date.now() + ".jpeg";
      const storageRef = ref(storage, "images/" + fileName);
      const metaData = {
        contentType: file.type,
      };
      await uploadBytes(storageRef, file, metaData)
        .then((snapshot) => {
          console.log("Uploaded a blob or file!", snapshot);
        })
        .then((resp) => {
          getDownloadURL(storageRef).then(async (url) => {
            console.log("File available at", url);
            // save the url to the database
            await db.insert(CarImages).values({
              imageUrl: url,
              carListingId: images,
            });
        alert("Listing added successfully")
            

          });
        });
    });

  };

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload car images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFiles?.map((file, index) => (
          <div key={index}>
            <IoIosCloseCircle
              className=" m-2 text-lg  "
              onClick={() => onImageRemove(file, index)}
            />
            <img
              src={URL.createObjectURL(file)}
              alt="car"
              className="w-full h-[130px] object-cover rounded-xl"
            />
          </div>
        ))}

        <label htmlFor="upload-images">
          <div className="border rounded-xl border-dotted border-primary bg-blue-50 p-10 cursor-pointer flex flex-col items-center justify-center hover:bg-blue-100 transition-all duration-200 ease-in-out">
            <h2 className="text-lg text-center">+</h2>
          </div>
        </label>
        <input
          className="opacity-0"
          type="file"
          multiple={true}
          id="upload-images"
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default UploadImages;
