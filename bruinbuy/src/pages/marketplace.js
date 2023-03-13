import React from 'react';
import {useState, useEffect} from 'react';
import {db, storage} from '../firebase-config';
import { getFirestore, collection, collectionGroup, getDoc, getDocs, QuerySnapshot, query, where, get, doc, onSnapshot} from 'firebase/firestore';
import './marketplace.css';
import defaultPic from "./default-placeholder.png";
import { async } from '@firebase/util';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function MarketPlace() {
  const [items, setItems] = useState([]);

  const spanStyle = {
    padding: '20px',
    background: '#efefef',
    color: '#000000'
  }
  
  const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '400px'
  }

  useEffect(() => {
    const fetchItems = async () => {
    const userItems = query(collectionGroup(db, 'allItems'), where('itemPrice', '>', 0));
      const querySnapshot = await getDocs(userItems);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data(),
          });
        setItems(data);
      })
    }
    fetchItems();
  }, []);

  useEffect(()=> {
    items.forEach(async (item) => {
      const itemImages = query(collectionGroup(db, 'images'), where('item', '==', item.id));
      const imagesSnapshot = await getDocs(itemImages);
      const imagesData = imagesSnapshot.docs.map((doc) => doc.data().url);
      setItems(prevItems => prevItems.map(prevItem => {
        if(prevItem.id == item.id) {
          return {...prevItem, images: imagesData.length ? imagesData : [defaultPic]};
        }
        return prevItem;
      }));
    });
  }, [items]);

  return (
    <div>
      <h1>Here are all the products for sale. Find something you like!</h1>
      
      <div className="items">
        {items.map((item, index) => {
          return <div className="item"> 
            <div className='itemImage'>
              <p>{item.images?.map((url) => <img src={url} alt="" />)}</p>
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