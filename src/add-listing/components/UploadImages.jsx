import React, { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../configs/firebaseConfig";
import { db } from "../../../configs";
import { useState } from "react";
import { CarImages } from "../../../configs/schema";
import { eq } from "drizzle-orm";
function UploadImages({ images ,carInfo,mode }) {
  const [EditCarImageList, setEditCarImageList] = useState([]);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = React.useState([]);

  useEffect(() => {
    if (mode === "edit" && carInfo?.images?.length > 0) {
      const imageUrls = carInfo.images.map((item) => item.imageUrl);
      setEditCarImageList(imageUrls);
    }else{
      setEditCarImageList([]);
    }
    console.log("carInfo", carInfo);
    console.log("images",EditCarImageList)
  }, [mode, carInfo]);
  
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

  const onImageRemovefromDB = async (image, index) => {
    const result = await db.delete(CarImages).where(eq(CarImages.id, carInfo.images[index].id));
    const imageList= EditCarImageList.filter((item) => item != image);
    setEditCarImageList(imageList);
    if (EditCarImageList.length === 0) {
      setEditCarImageList([]); // Reset to empty list
    }

  }

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
        navigate("/profile");
    alert("Listing added successfully")
        

          });
        });
    });


  };
  console.log("carInfo.images", carInfo?.images);

  return (
    <div>
      <h2 className="font-medium text-xl my-3">Upload car images</h2>
  
      {mode === "edit" && EditCarImageList?.length === 0 ? (
        <p>No images available. Please upload new images.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {EditCarImageList?.map((file, index) => (
            <div key={index}>
              <IoIosCloseCircle
                className=" m-2 text-lg  "
                onClick={() => onImageRemovefromDB(file, index)}
              />
              <img
                src={file}
                alt="car"
                className="w-full h-[130px] object-cover rounded-xl"
              />
            </div>
          ))}
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
        </div>
      )}
  
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
  );
  
}

export default UploadImages;
