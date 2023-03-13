import { db } from '../firebase-config';
import { collection, deleteDoc, doc, addDoc, getDocs, query, where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
  

import {connectStorageEmulator, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase-config";
import {v4} from "uuid";
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
    if(isuploadImagesFinished){
      console.log(User);
      const docRef = await addDoc(itemsCollectionRef, {itemName: newItemName, itemDesc: newItemDesc, itemPrice: Number(newItemPrice), itemQuantity: Number(newItemQuantity), user: User});
      
      for(let i=0; i < urls.length; i++){
        console.log(urls[i]);
        await addDoc(imagesCollectionRef, {url: urls[i], item: docRef.id});
      }
    }
    else{
      console.log("waiting for async uploadImages funct to finish...")
    }
    //setWasCreateItemPressed(false);
  }

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "allItems", id);
    await deleteDoc(itemDoc);
  };

  useEffect(() =>{
    const getItems = async () => {
      const q = query(itemsCollectionRef, where("user", "==", User));
      const data = await getDocs(q);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getItems();
  }, []);

  useEffect(() =>{ 
    const loggedInUser = localStorage.getItem("user"); 
    if (loggedInUser) {
      const foundUser = loggedInUser; 
      setUser(foundUser); 
    }; 
  }, []);


  return (
    <div>
      <tr>
        <td height="50"></td>
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

      <input 
        type="file" multiple
        onChange={uploadImages}
      />
  

      <button onClick={createItem}> Add Item </button>
      {!isuploadImagesFinished && wasCreateItemPressed && (<p>Wait for image(s) to upload!</p>)}
      {items.map((item) => {
        if(!item.data){
          return (
            <div>
              {" "}
              <h1>Name: {item.itemName}</h1>
              <h2>Desc: {item.itemDesc}</h2>
              <h2>Quantity: {item.itemQuantity}</h2>
              <hi>Price: {item.itemPrice}</hi>

              <button
                onClick={() => {
                  deleteItem(item.id)
                }}
              >
                Delete Item
              </button>
            </div>
          );
        }
        
      })}
      
    </div>
  );
};
  
export default Profile;