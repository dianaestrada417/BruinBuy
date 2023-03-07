import React from 'react';
import {useState, useEffect} from 'react';
import {db, storage} from '../firebase-config';
import { getFirestore, collection, collectionGroup, getDoc, getDocs, QuerySnapshot, query, where, get, doc, onSnapshot} from 'firebase/firestore';
import './marketplace.css';
import pic from "./default-placeholder.png";
import { async } from '@firebase/util';

function MarketPlace() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
    const userItems = query(collectionGroup(db, 'items'), where('itemPrice', '>', 0));
      const querySnapshot = await getDocs(userItems);
      querySnapshot.forEach((doc) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setItems(data);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
    }
    fetchItems();
  }, []);

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