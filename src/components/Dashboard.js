import React from "react";
import { useAuth } from "../context/AuthContext";
import { useFireStore } from "../hooks/useFirestore";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ThemeSwitch from "./ThemeSwitch";
import ModalOverlay from "./ModalOverlay";
import { useModalOverlay } from "../context/ModalOverlayContext";

function Dashboard() {
  const { loading, currentUser, deleteData, logout } = useAuth();
  const { docs } = useFireStore("gallery");
  const { modalOverlay, setModalOverlay } = useModalOverlay();
  const history = useHistory();

  return (
    <div className="w-full flex flex-col dark:bg-black min-h-screen">
      {loading && JSON.stringify(currentUser.uid)}
      <div className="flex xs:flex-col xs:justify-center lg:flex-row md:justify-between xs:px-10 lg:px-24 pt-5">
        <div className="flex xs:flex-col md:flex-row items-center">
          <span className="font-mono font-extrabold dark:text-white">
            My Unsplash
          </span>
          <SearchBox />
        </div>
        <div className="flex xs:justify-center xs:pt-8 lg:pt-0">
          <ThemeSwitch />
          <button
            className="bg-blue-600 py-2 text-yellow-50 rounded-md px-4 mr-3 w-24"
            onClick={() => setModalOverlay(true)}
          >
            + Add
          </button>
          <button
            className="bg-red-600 py-2 text-yellow-50 rounded-md px-4 w-24"
            onClick={() => {
              logout();
              history.replace("/signout");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      {modalOverlay && <ModalOverlay />}
      <ResponsiveMasonry className="pt-12 xs:px-10 lg:px-24">
        <Masonry>
          {docs
            ? docs.map((image) => {
                return (
                  <div
                    key={image.uid}
                    className="xs:w-full lg:w-5/6 h-auto rounded-xl mb-10 shadow-2xl dark:bg-white"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="rounded-t-xl"
                    />
                    <div className="flex justify-between mt-2 rounded-b-xl">
                      <span className="px-4">{image.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-4 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        onClick={() => deleteData(image.uid)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })
            : null}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Dashboard;
