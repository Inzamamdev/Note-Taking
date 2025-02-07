import { useEffect, useState } from "react";
import Sidebar from "../component/SIdebar";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSort } from "react-icons/md";
import NoteInput from "../component/NoteInput";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [search, setSearch] = useState("");
  const [isSort, setIsSort] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      setUserData(data);
      if (response.ok) {
        setUserData(data);
      } else {
        console.error("Error fetching user data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex mx-5   ">
      <Sidebar
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
        profile={userData && userData?.name}
      />
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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          <button
            className="flex items-center bg-gray-100 px-3 py-1 rounded-2xl cursor-pointer"
            onClick={() => setIsSort(!isSort)}
          >
            <MdOutlineSort fontSize={20} />
            <p className="pl-1">Sort</p>
          </button>
        </div>

        <div className="">
          <NoteInput
            userId={userData && userData?.id}
            search={search}
            isSort={isSort}
            isFavourite={isFavourite}
          />
        </div>
      </div>
    </div>
  );
}
