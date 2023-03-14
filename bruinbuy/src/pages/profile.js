import { db, storage } from '../firebase-config';
import { collection, collectionGroup, deleteDoc, doc, addDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { connectStorageEmulator, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import defaultPic from "./default-placeholder.png";
import "./profile.scss";
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemQuantity, setNewItemQuantity] = useState(0);

  const [urls, setUrls] = useState([]);
  const { User, setUser } = React.useContext(UserContext);
  const [isuploadImagesFinished, setIsUploadImagesFinished] = useState(false);
  const [wasCreateItemPressed, setWasCreateItemPressed] = useState(false);

  const [items, setItems] = useState([]);

  const itemsCollectionRef = collection(db, "allItems");
  const imagesCollectionRef = collection(db, "images");

  const uploadImages = async (event) => {
    setIsUploadImagesFinished(false);
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name + v4()}`);
      const snapshot = await uploadBytes(storageRef, file);

      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      setUrls(prevUrls => [...prevUrls, url]);

    }

    await new Promise((resolve) => setTimeout(resolve, 1000)); // example async operation
    setIsUploadImagesFinished(true);
  }

  const createItem = async () => {
    setWasCreateItemPressed(true);
    if (isuploadImagesFinished) {
      console.log(User);
      const docRef = await addDoc(itemsCollectionRef, { itemName: newItemName, itemDesc: newItemDesc, itemPrice: Number(newItemPrice), itemQuantity: Number(newItemQuantity), user: User });

      for (let i = 0; i < urls.length; i++) {
        console.log(urls[i]);
        await addDoc(imagesCollectionRef, { url: urls[i], item: docRef.id });
      }
    }
    else {
      console.log("waiting for async uploadImages funct to finish...")
    }
    //setWasCreateItemPressed(false);
  }

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "allItems", id);
    await deleteDoc(itemDoc);
  };

  useEffect(() => {
    const getItems = async () => {
      const q = query(itemsCollectionRef, where("user", "==", User));
      const data = await getDocs(q);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getItems();
  }, []);

  //Add input tags --------------------------------------------------------------------------------------------------------------------------------------------
  const [tags, setTags] = React.useState([]);

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index != indexToRemove));
  };
  const addTags = event => {
    if (event.target.value != "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  useEffect(() => {
    items.forEach(async (item) => {
      const itemImages = query(collectionGroup(db, 'images'), where('item', '==', item.id));
      const imagesSnapshot = await getDocs(itemImages);
      const imagesData = imagesSnapshot.docs.map((doc) => doc.data().url);
      setItems(prevItems => prevItems.map(prevItem => {
        if (prevItem.id == item.id) {
          return { ...prevItem, images: imagesData.length ? imagesData : [defaultPic] };
        }
        return prevItem;
      }));
    });
  }, [items]);


  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = loggedInUser;
      setUser(foundUser);
    };
  }, []);


  return (
    <div>
      <tr>
        <td height="75"></td>
      </tr>
      <h1>{User}'s Profile</h1>

      <h1>Add Items</h1>
      <input
        placeholder="Item Name..."
        onChange={(event) => {
          setNewItemName(event.target.value)
        }}
      />
      <input
        placeholder="Item Description..."
        onChange={(event) => {
          setNewItemDesc(event.target.value)
        }}
      />
      <input
        type="number"
        placeholder="Item Price..."
        onChange={(event) => {
          setNewItemPrice(event.target.value)
        }}
      />
      <input
        type="number"
        placeholder="Quantity..."
        onChange={(event) => {
          setNewItemQuantity(event.target.value)
        }}
      />

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
          placeholder="Press enter to add tags"
          onChange={(event) => {
            setTags(tags)
          }}
        />
      </div>


      <input
        type="file" multiple
        onChange={uploadImages}
      />


      <tr>
        <td height="10"></td>
      </tr>
      <button onClick={createItem}> Add Item </button>
      <tr>
        <td height="10"></td>
      </tr>

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
                  <p>Tags: {item.tags}</p>
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
          }
        })}
      </div>
    </div>
  );
};

export default Profile;