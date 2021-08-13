import React, { useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { currentUser, uploadData, images, realTimeDBListener } = useAuth();
  const nameRef = useRef();
  const urlRef = useRef();

  function submitHandler(e) {
    console.table(images);
    e.preventDefault();
    uploadData(nameRef.current.value, urlRef.current.value);
    realTimeDBListener();
  }

  return (
    <div>
      {JSON.stringify(currentUser.uid)}
      <form onSubmit={submitHandler}>
        <label>Name</label>
        <input type="text" ref={nameRef}></input>
        <label>URL</label>
        <input type="text" ref={urlRef}></input>
        <button type="submit">Submit</button>
      </form>
      {images
        ? images.map((image) => {
            //console.log(image.uid);
            return (
              <div key={image.uid}>
                <img src={image.url} alt={image.name} />
                <span>{image.name}</span>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Dashboard;
