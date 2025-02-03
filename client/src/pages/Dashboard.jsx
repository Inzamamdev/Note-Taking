import { useEffect, useState } from "react";

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

  return (
    <div className=" bg-amber-200 mx-5">
      <div className="flex">
        <div className="border-2 border-black">
          <input type="text" className="border-2 border-black w-full" />
        </div>

        <button>Sort</button>
      </div>
    </div>
  );
}
