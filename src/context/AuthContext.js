import { createContext, useState, useEffect, useContext } from "react";
import { auth, fireDB } from "../auth/firebase";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  //const [images, setImages] = useState([]);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(null);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function uploadData(name, url) {
    return fireDB.collection("gallery").add({
      name: name,
      url: url,
    });
  }

  function deleteData(uid) {
    return fireDB.collection("gallery").doc(uid).delete();
  }

  function updateData(uid, name, url) {
    fireDB.collection("gallery").doc(uid).update({ name: name, url: url });
  }
  // const readData = useCallback(() => {
  //   return fireDB
  //     .collection("gallery")
  //     .get()
  //     .then((snapshot) =>
  //       snapshot.forEach((doc) => {
  //         setImages([
  //           ...images,
  //           { name: doc.data().name, url: doc.data().url },
  //         ]);
  //       })
  //     );
  // }, [images]);

  // function readData() {
  //   return fireDB
  //     .collection("gallery")
  //     .get()
  //     .then((snapshot) => {
  //       let updatedImages = [...images];
  //       snapshot.forEach((doc) => {
  //         //console.log(doc.id.toString(), "=>", doc.data());
  //         updatedImages.push({
  //           uid: doc.id.toString(),
  //           name: doc.data().name,
  //           url: doc.data().url,
  //         });
  //       });
  //       setImages(updatedImages);
  //     });
  // }

  // async function readData() {
  //   const response = fireDB.collection("gallery");
  //   const data = await response.get();
  //   data.docs.forEach((doc) => {
  //     setImages([
  //       ...images,
  //       {
  //         uid: doc.id.toString(),
  //         name: doc.data().name,
  //         url: doc.data().url,
  //       },
  //     ]);
  //   });
  // }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    // unsubscribe when unmount
    return () => {
      unsubscribe();
      setCurrentUser(null);
    };
    // disabling the rule for the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    uploadData,
    updateData,
    deleteData,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
    </AuthContext.Provider>
  );
};
