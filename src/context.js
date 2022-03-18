import { createContext, useState, useEffect } from "react";

const Context = createContext();

function ContextProvider({ children }) {
  const [allPhotos, setAllPhotos] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MahmoudHossameldin/react-product-imgs/main/images.json"
    )
      .then((res) => res.json())
      .then((data) => setAllPhotos(data));
  }, []);

  function toggleFavorite(id) {
    // const updatedArr = allPhotos.map((photo) => {
    //   return photo.id === id
    //     ? { ...photo, isFavorite: !photo.isFavorite }
    //     : photo;
    // });

    const updatedArr = allPhotos.map((photo) => {
      if (photo.id === id) {
        console.log(id);
        console.log(!photo.isFavorite);
        return { ...photo, isFavorite: !photo.isFavorite };
      }
      return photo;
    });

    setAllPhotos(updatedArr);
  }

  function addToCart(newItem) {
    setCartItems((prevCartItems) => [...prevCartItems, newItem]);
  }

  function removeFromCart(id) {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function emptyCart() {
    setCartItems([]);
  }

  return (
    <Context.Provider
      value={{
        allPhotos,
        toggleFavorite,
        addToCart,
        cartItems,
        removeFromCart,
        emptyCart,
      }}
    >
      {children}
    </Context.Provider>
  );
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
