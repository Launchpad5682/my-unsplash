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
                    className="xs:w-full lg:w-5/6 h-auto rounded-xl mb-10 pb-2 shadow-2xl dark:bg-white"
                  >
                    <img
                      src={image.url}
                      alt={image.name}
                      className="rounded-t-xl"
                    />
                    <div className="flex justify-between mt-2 rounded-b-xl px-2">
                      <span className="">{image.name}</span>
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          viewBox="0 0 32 32"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"></path>
                        </svg>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
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
