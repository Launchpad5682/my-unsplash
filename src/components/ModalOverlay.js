import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { useModalOverlay } from "../context/ModalOverlayContext";

const ModalOverlay = () => {
  const { uploadData } = useAuth();
  const nameRef = useRef();
  const urlRef = useRef();
  const { setModalOverlay } = useModalOverlay();

  function submitHandler(e) {
    e.preventDefault();
    uploadData(nameRef.current.value, urlRef.current.value);
    setModalOverlay(false);
    nameRef.current.value = null;
    urlRef.current.value = null;
  }

  return (
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
  );
};

export default ModalOverlay;
