import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useFireStore } from "../hooks/useFirestore";
import SearchBox from "./SearchBox";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { loading, currentUser, uploadData, deleteData, logout } = useAuth();
  const { docs } = useFireStore("gallery");
  const [modalOverlay, setModalOverlay] = useState(false);
  const nameRef = useRef();
  const urlRef = useRef();
  const history = useHistory();

  function submitHandler(e) {
    e.preventDefault();
    uploadData(nameRef.current.value, urlRef.current.value);
    setModalOverlay(false);
    nameRef.current.value = null;
    urlRef.current.value = null;
  }

  return (
    <div className="w-full h-screen no-scrollbar mt-5">
      {loading && JSON.stringify(currentUser.uid)}
      <div className="flex justify-between px-10">
        <div className="flex items-center">
          <span className="font-mono">My Unsplash</span>
          <SearchBox />
        </div>
        <div>
          <button
            className="bg-blue-600 py-2 text-yellow-50 rounded-md px-4 "
            onClick={() => setModalOverlay(true)}
          >
            + Add
          </button>
          <button
            className="bg-red-600 py-2 text-yellow-50 rounded-md px-4"
            onClick={() => {
              logout();
              history.replace("/signout");
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      {modalOverlay && (
        <div className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center overscroll-y-none">
          <div className=" bg-white flex flex-col py-2 px-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-center">Add an image</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer hover:bg-gray-300 p-1 rounded-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setModalOverlay(false)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <form onSubmit={submitHandler} className="space-y-4 py-6">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  ref={nameRef}
                  className="w-full focus:outline-none border-gray-300 border-solid border-2 h-8 rounded-lg px-3 py-4 focus:border-blue-500"
                ></input>
              </div>
              <label>URL</label>
              <div>
                <input
                  type="text"
                  ref={urlRef}
                  className="w-full focus:outline-none border-gray-300 border-solid border-2 h-8 rounded-lg px-3 py-4 focus:border-blue-500"
                ></input>
              </div>
              <button
                type="submit"
                className="bg-blue-600 p-2 text-yellow-50 rounded-md min-w-full"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="my-14 masonry mx-auto w-11/12 ">
        {docs
          ? docs.map((image) => {
              //console.log(image.uid);
              return (
                <div
                  key={image.uid}
                  className="w-96 h-auto break-inside rounded-xl mb-8 shadow-2xl"
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
      </div>
    </div>
  );
}

export default Dashboard;
