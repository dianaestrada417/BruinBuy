import React from 'react';
import {useState, useEffect} from 'react';
import {db} from '../firebase-config';
import {collection, getDocs} from 'firebase/firestore';
import './marketplace.css';
import pic from "../default-placeholder.png";

function MarketPlace() {
  const [items, setItems] = useState([]);
  const itemsCollection = collection(db, "items");

  useEffect(() => {
    const getItems = async () => {
      const data = await getDocs(itemsCollection);
      setItems(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getItems();
  }, [])

  return (
    <div>
      <h1>Here are all the products for sale. Find something you like!</h1>
      
      <div className="items">
        {items.map((item) => {
          return <div className="item"> 
            <div className='itemImage'>
              <img src={pic}></img>
            </div>
            <div className='itemInfo'>
              <h2>{item.itemName}</h2>
              <p>{item.itemDesc}</p> 
              <p>{item.itemPrice}</p>
            </div>
          </div>
        })}
      </div>

    </div>
  );
};
  
export default MarketPlace;