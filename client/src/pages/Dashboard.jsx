import { useEffect, useState } from "react";
import Sidebar from "../component/SIdebar";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSort } from "react-icons/md";

export default function Dashboard() {
  const [userName, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setUserData(data.name);
      } else {
        console.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);
  console.log(userName);
  return (
    <div className="h-screen flex mx-5   ">
      <Sidebar />
      <div className="mt-8 ml-7 w-full mx-2">
        <div className="flex items-center  rounded-2xl justify-between gap-4">
          <div className=" relative w-full">
            <IoMdSearch
              className="absolute top-2 left-3 text-gray-200"
              fontSize={20}
            />
            <input
              type="text"
              name=""
              id=""
              className=" w-full border-gray-200 pl-10 py-1 border-2  rounded-2xl focus:outline-none placeholder-gray-400"
              placeholder="Search"
            />
          </div>

          <button className="flex items-center bg-gray-100 px-3 py-1 rounded-2xl ">
            <MdOutlineSort fontSize={20} />
            <p className="pl-1">Sort</p>
          </button>
        </div>
      </div>
    </div>
  );
}
