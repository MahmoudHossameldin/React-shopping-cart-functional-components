import { createContext, useState, useEffect } from "react";

const Context = createContext();

function ContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
    )
      .then((res) => res.json())
      .then((data) => setAllPhotos(data));
  }, []);

  return <Context.Provider value={{ allPhotos }}>{children}</Context.Provider>;
}

export { Context, ContextProvider };

//   useEffect(() => {
//     async function getImages() {
//       const res = await fetch(
//         "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"
//       );
//       const data = res.json();
//       setAllPhotos(data);
//     }
//     getImages();
//   }, []);
