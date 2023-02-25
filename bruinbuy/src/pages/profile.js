import { db } from '../firebase-config';
import { collection, deleteDoc, doc, addDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
  
const Profile = () => {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [newItemPrice, setNewItemPrice] = useState(0);
  const [newItemQuantity, setNewItemQuantity] = useState(0);

  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const usersCollectionRef = collection(db, "users");

  //we need to be able to reference the user id here
  const userID = "HA520x5tGinMehQNelgP";
  const usersItemCollectionRef = collection(db, "users", userID, "items");

  

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
  const createItem = async () => {
    await addDoc(usersItemCollectionRef, {itemName: newItemName, itemDesc: newItemDesc, itemPrice: Number(newItemPrice), itemQuantity: Number(newItemQuantity) });

  }

  const deleteItem = async (id) => {
    const itemDoc = doc(db, "users", userID, "items", id);
    await deleteDoc(itemDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getUsers();
  }, []);

  useEffect(() =>{
    const getItems = async () => {
      const data = await getDocs(usersItemCollectionRef);
      setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
    };

    getItems();
  }, []);

  return (
    <div>
      <tr>
        <td height="50"></td>
      </tr>

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