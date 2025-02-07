import React from "react";
import { useNavigate } from "react-router-dom";
import { FaNotesMedical } from "react-icons/fa";
import { ImHome3 } from "react-icons/im";
import { FaStar } from "react-icons/fa";

export default function Sidebar({ isFavourite, setIsFavourite, profile }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className=" w-60 border-1 border-gray-200 mt-3 rounded-4xl mb-3">
      <div>
        <div className="flex items-center mt-5 ml-5 mb-3">
          <FaNotesMedical fontSize={30} className="text-[#6c32ab]" />
          <p className="ml-1 font-semibold">AI NOTES</p>
        </div>
        <div className="mx-4">
          <div className="h-0.5 w-full bg-gray-100 mb-3"></div>
          <div className="flex flex-col justify-between h-[36rem]">
            <div>
              <span className="text-[#6c32ab] flex items-center bg-[#f5ebff] px-2 py-2 rounded-3xl">
                <ImHome3 fontSize={22} />
                <p className="ml-1.5 font-semibold">Home</p>
              </span>
              <span
                className="flex items-center  px-2 py-1 rounded-2xl text-gray-300 cursor-pointer"
                onClick={() => setIsFavourite(!isFavourite)}
              >
                <FaStar fontSize={22} />
                <p className="ml-1.5 font-semibold">Favourites</p>
              </span>
            </div>
            <div>
              <p className="text-center">{profile}</p>
              <button
                onClick={handleLogout}
                className="bg-[#f5ebff] w-full py-2 text-[#6c32ab] rounded-2xl cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
