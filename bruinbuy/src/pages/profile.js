import { db } from '../firebase-config';
import { collection, deleteDoc, doc, addDoc, getDocs, query, where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
  

import {connectStorageEmulator, getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../firebase-config";
import {v4} from "uuid";
import { UserContext } from '../contexts/UserContext';

const Profile = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemQuantity, setNewItemQuantity] = useState(0);

  const [urls, setUrls] = useState([]);
  const [itemImageUrls, setImageUrls] = useState("");

  const { User, setUser } = React.useContext(UserContext);
  
  const uploadImages = async (event) => {
    const files = event.target.files;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const storageRef = ref(storage, `images/${file.name + v4()}`);
      const snapshot = await uploadBytes(storageRef, file);

      const url = await getDownloadURL(snapshot.ref);
      console.log(url);
      setUrls(prevUrls => [...prevUrls, url]);
      
    }
  }

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const usersCollectionRef = collection(db, "users");


  //const usersCollectionRef = collection(db, "signups");
  const itemsCollectionRef = collection(db, "allItems");
  const imagesCollectionRef = collection(db, "images");
  //we need to be able to reference the user id here
  //const userID = "HA520x5tGinMehQNelgP";
  //const usersItemCollectionRef = collection(db, "users", userID, "items");

  
  /*
  const createUser = async () => {
    const document = await addDoc(usersCollectionRef, { 
      name: newName, 
      age: Number(newAge), 
      isVendor: false
    });

    const newCollectionRef = collection(db, "users", document.id, "items");
    await addDoc(newCollectionRef, {
      data: 'user has no items'
    });
  }

  
      <input 
        placeholder="Name..." 
        onChange={(event)=> {
          setNewName(event.target.value)
        }} 
      />
      <input 
      type="number" 
      placeholder="Age..." 
      onChange={(event) => {
        setNewAge(event.target.value)
      }} 
      />
      
      <button onClick={createUser}> Create User </button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <hi>Age: {user.age}</hi>
          </div>
        );
      })}

  const joinURLString = () => {
    const urlsString = urls.join(',');
    console.log(urlsString);
  }*/

  const createItem = async () => {
    //console.log("urls:", urls);
    console.log(User);
    const docRef = await addDoc(itemsCollectionRef, {itemName: newItemName, itemDesc: newItemDesc, itemPrice: Number(newItemPrice), itemQuantity: Number(newItemQuantity), user: User});
    
    for(let i=0; i < urls.length; i++){
      console.log(urls[i]);
      await addDoc(imagesCollectionRef, {url: urls[i], item: docRef.id});
    }
  }

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "allItems", id);
    await deleteDoc(itemDoc);
  };

  /*
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getUsers();
  }, []);
  */

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