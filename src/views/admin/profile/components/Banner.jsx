import React from "react";
import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { MdModeEditOutline } from "react-icons/md";
import { getAuth, updateProfile as authUpateProfile } from "firebase/auth";
import { useAuth } from "provider/AuthProvider";
import { useState } from 'react';
import UploadProfilePic from "api/auth/uploadProfilePic";

const Banner = () => {
  const { user } = useAuth();
  const auth = getAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChangePic = async (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if(!file){
      return;
    }
    setSelectedImage(file);
    const res = await UploadProfilePic(file);
    if(res.ok){
      const img = await res.json();
      if( user && auth && auth.currentUser){
        try{
          await authUpateProfile(user, { photoURL: img.downloadURL }).then(()=>{
            console.log("User's photoURL updated successfully");
          })
        } catch (error){
          console.log(error);
        }
      }
    } else{
      console.log("something went wrong");
    }
  };

  const handleEditClick = () => {
    // Programmatically trigger the click event of the input element
    document.getElementById('upload').click();
  };

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="relative -bottom-12 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-pink-400 dark:border-navy-700">
          <div className="relative w-32">
            <img className="h-full w-full rounded-full overflow-hidden object-cover" src={selectedImage ? URL.createObjectURL(selectedImage) : (auth === null ? avatar : (auth.currentUser ? (auth.currentUser.photoURL !== null ? auth.currentUser.photoURL : avatar) : avatar))} alt="" />
            {/* Input file element */}
          </div>
          {/* Edit button */}
          <div>
            <input id="upload" type="file" className="hidden" onChange={handleChangePic} accept="image/*" />
            <button onClick={handleEditClick} role="button" className="absolute bottom-3 right-0 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-sm px-2 pe-2 border-none">
              <div className="flex items-center justify-center text-white dark:text-white">
                <MdModeEditOutline className="mr-1"/> Edit
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
        {auth === null ? "User" : (auth.currentUser ? (auth.currentUser.displayName !== null ? auth.currentUser.displayName : "User") : "User")}
        </h4>
        <p className="text-base font-normal text-gray-600">User</p>
      </div>

      {/* Post followers */}
      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">17</p>
          <p className="text-sm font-normal text-gray-600">Projects</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            9.7K
          </p>
          <p className="text-sm font-normal text-gray-600">Followers</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            434
          </p>
          <p className="text-sm font-normal text-gray-600">Following</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
