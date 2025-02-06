import React, { useState } from "react";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiListCheck2 } from "react-icons/ri";
import { MdOutlineCreate } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";

export default function TabMenu() {
  const [activeTab, setActiveTab] = useState("Transcript");

  const tabs = [
    { name: "Notes", icon: <HiOutlineDocumentText />, disabled: true },
    { name: "Transcript", icon: <RiListCheck2 />, disabled: false },
    { name: "Create", icon: <MdOutlineCreate />, disabled: true },
    { name: "Speaker Transcript", icon: <FaRegUser />, disabled: true },
  ];

  return (
    <div className="flex items-center bg-gray-50 p-1 rounded-full space-x-1 w-fit border-1 border-gray-200 mb-5">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          onClick={() => !tab.disabled && setActiveTab(tab.name)}
          className={`flex items-center px-2 py-1 rounded-full text-sm font-medium
            ${
              tab.disabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-200"
            }
            ${activeTab === tab.name ? "bg-white shadow-md items-center" : ""}
          `}
          disabled={tab.disabled}
        >
          {tab.icon}
          <span className="ml-1">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
