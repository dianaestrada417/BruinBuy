//https://www.youtube.com/watch?v=iAytfevXk_s

import { db, storage } from '../../firebase-config';
import { collection, collectionGroup, deleteDoc, doc, addDoc, getDocs, query, where, getDoc, Timestamp } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import defaultPic from "../default-placeholder.png";
import "./profile.scss";
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { User, setUser} = useContext(UserContext);
  const [ isLoggedIn, setIsLoggedIn] = useState(false);
  
  /*useEffect(() => {
    if (User) {
      setIsLoggedIn(true);
    };
  }, [User, setIsLoggedIn]);*/

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
      setIsLoggedIn(true);
    };
  }, [setUser]);

  return (
    <div >
      <tr>
        <td height="75"></td>
      </tr>
      <section>
        {isLoggedIn ? <LoggedInProfile user={User}/> : <NotLoggedInProfile />}
      </section>
    </div>
  );
}

const NotLoggedInProfile = () => {
  let navigate = useNavigate();
  const navToLogin = () => {
    navigate('/login') }
  const navToSignup = () => {
    navigate('/signup') }
  return (
    <>
      <div className='loginsuccess'>
        <h1>Head to the 
          <button className='login' onClick={navToLogin}>Login Page</button>
          or
          <button className='signup' onClick={navToSignup}>Sign Up Page</button>
          to access your account.
        </h1>
      </div>
    </>
  )
}

const LoggedInProfile = (props) => {
  const { setUser } = useContext(UserContext);
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemQuantity, setNewItemQuantity] = useState(-1);

  const [urls, setUrls] = useState([]);

  const [isuploadImagesFinished, setIsUploadImagesFinished] = useState(false);
  const [wasCreateItemPressed, setWasCreateItemPressed] = useState(false);

  const [items, setItems] = useState([]);

  const itemsCollectionRef = collection(db, "allItems");
  const imagesCollectionRef = collection(db, "images");
  const [imagesUploaded, setImagesUploaded] = useState(0);

  const uploadImages = async (event) => {
    setIsUploadImagesFinished(false);
    const files = event.target.files;
    setImagesUploaded(imagesUploaded + 1);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name + v4()}`);
      const snapshot = await uploadBytes(storageRef, file);

      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      setUrls(prevUrls => [...prevUrls, url]);

      event.target.files = null;
      setEvents([...events, event]);

    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // example async operation
    setIsUploadImagesFinished(true);
  }


  const [events, setEvents] = useState([]);

  const clearInput = rawr => {
    console.log(events);
    for (let i = 0; i < events.length; i++) {
      if (events[i].target.value !== "") {
        events[i].target.value = "";
      }
    }
    setTags([]);
    setUrls([]);
  };

  //Create an Item --------------------------------------------------------------------------------------------------------------------------------------------
  const createItem = async () => {
    if (newItemName !== '' && newItemDesc !== '' && newItemPrice > -1 && newItemQuantity > 0 && tags.length > 0 && imagesUploaded > 0) {
      setWasCreateItemPressed(true);
      setImagesUploaded(0);
      if (isuploadImagesFinished ) {
        const docRef = await addDoc(itemsCollectionRef, { itemName: newItemName, itemDesc: newItemDesc, itemPrice: Number(newItemPrice), itemQuantity: Number(newItemQuantity), tags: tags, user: props.user, time: Timestamp.now()});

        for (let i = 0; i < urls.length; i++) {
          // console.log(urls[i]);
          await addDoc(imagesCollectionRef, { url: urls[i], item: docRef.id });
          clearInput(events);
        }
      }
      else {
        console.log("waiting for async uploadImages funct to finish...")
      }
    }
    //setWasCreateItemPressed(false);
  }

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "allItems", id);
    await deleteDoc(itemDoc);
  };

  const handleNameInputChange = event => {
    setNewItemName(event.target.value);
    setEvents([...events, event]);

  };

  const handleDescInputChange = event => {
    setNewItemDesc(event.target.value);
    setEvents([...events, event]);
  };

  const handlePriceInputChange = event => {
    setNewItemPrice(event.target.value);
    setEvents([...events, event]);
  };

  const handleQuantityInputChange = event => {
    setNewItemQuantity(event.target.value);
    setEvents([...events, event]);
  };


  //Add input tags --------------------------------------------------------------------------------------------------------------------------------------------
  const [tags, setTags] = React.useState([]);

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  const addTags = event => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };



  //Get the User's info --------------------------------------------------------------------------------------------------------------------------------------------
  const [userFirstName, setUserFirstName] = useState("");

  useEffect(() => {
    const userDocRef = doc(db, "signups", props.user);

    const fetchUserName = async () => {
      const userDocSnap = await getDoc(userDocRef);
      console.log(userDocSnap)
      if (userDocSnap.exists()) {
        const data = userDocSnap.data();
        setUserFirstName(data.firstName);
        console.log(userFirstName);
      } else {
        console.log('no data');
      }
    }
    fetchUserName();
  }, [props.user, userFirstName]);








  useEffect(() => {
    const getItems = async () => {
      const q = query(itemsCollectionRef, where("user", "==", props.user));
      const data = await getDocs(q);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  },[props.user, itemsCollectionRef]);

  useEffect(() => {
    items.forEach(async (item) => {
      const itemImages = query(collectionGroup(db, 'images'), where('item', '==', item.id));
      const imagesSnapshot = await getDocs(itemImages);
      const imagesData = imagesSnapshot.docs.map((doc) => doc.data().url);
      setItems(prevItems => prevItems.map(prevItem => {
        if (prevItem.id === item.id) {
          return { ...prevItem, images: imagesData.length ? imagesData : [defaultPic] };
        }
        return prevItem;
      }));
    });
  }, [items]);

  const SignOut = () => {
    useEffect(() => {
      setUser(null)
    }, []);
  }

  return (
    <div>
      <h1>{userFirstName}'s Profile</h1>

      <h2> Add Items </h2>
      <div className='itemForm'>
      <input
        placeholder="Item Name..."
        onChange={(event) => {
          handleNameInputChange(event)
        }}
      />
      <input
        placeholder="Item Description..."
        onChange={(event) => {
          handleDescInputChange(event)
        }}
      />
      <input
        type="number"
        placeholder="Item Price..."
        onChange={(event) => {
          handlePriceInputChange(event)
        }}
      />
      <input
        type="number"
        placeholder="Quantity..."
        onChange={(event) => {
          handleQuantityInputChange(event)
        }}
      />
      </div>

      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon'
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
          placeholder="Press enter to add tags..."
          onChange={(event) => {
            setTags(tags)
          }}
        />
      </div>
      <div className='itemForm'>
        <input
          type="file" multiple
          onChange={uploadImages}
        />
      </div>
      

      <tr>
        <td height="10"></td>
      </tr>
      <button onClick={createItem}> Double Click to Add Item </button>
      <tr>
        <td height="10"></td>
      </tr>

      <h2> {'\u2193'} Items in your maketplace {'\u2193'} </h2>
      {!isuploadImagesFinished && wasCreateItemPressed && (<p>Wait for image(s) to upload!</p>)}

      <div className="items">
        {items.map((item) => {
          if (!item.data) {
            return (
              <div className="item">
                <div className='itemImage'>
                  <p>{item.images?.map((url) => <img src={url} alt="" />)}</p>
                </div>
                <div className='itemInfo'>
                  <h1>Name: {item.itemName}</h1>
                  <p>Desc: {item.itemDesc}</p>
                  <p>Quantity: {item.itemQuantity}</p>
                  <p>Price: {item.itemPrice}</p>
                  <p>Tags: {item.tags.join(', ')}</p>
                  <button
                    onClick={() => {
                      deleteItem(item.id)
                    }}
                  >
                    Delete Item
                  </button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
      <button onClick={SignOut}>Sign Out</button>
    </div>
  );
};

export default Profile;