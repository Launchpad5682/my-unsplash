import { useEffect, useState } from "react";
import { fireDB } from "../auth/firebase";

export const useFireStore = (collections) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let unsubscribe = fireDB
      .collection("gallery")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        let documents = [];
        snapshot.forEach((doc) => {
          documents.push({
            uid: doc.id.toString(),
            name: doc.data().name,
            url: doc.data().url,
          });
        });
        setDocs(documents);
      });

    return () => unsubscribe();
  }, [collections]);

  return { docs };
};
