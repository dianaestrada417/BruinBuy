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
  const [searchState, setSearchState] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [itemResults, setItemResults] = useState();

  const allItemsRef = collection(db, "allItems");

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

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    setSearchState(value)
  }

  const handleSubmit = async() => {
    setErrorMessage('');
    //create search for item names query
    const nameq = query(allItemsRef, 
      where("itemName", ">=", searchState), 
      where("itemName", "<=", searchState+ '\uf8ff'));
    const nameQuerySnapshot = await getDocs(collectionGroup(db, 'allItems'))
    
    //if there is match, update global variable
    const data = [];
    nameQuerySnapshot.forEach((doc) => {
      console.log(doc.data().tags)
      if(doc.data().itemName.includes(searchState) || doc.data().itemDesc.includes(searchState) || (doc.data().tags && doc.data().tags.includes(searchState))){
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    })
    console.log(data)
    setItems(data)
  

    //if not, send error message
    if(!data.length){
      setErrorMessage("No results!");
    }
  }

  return (
    <>
    <div>
        <tr>
        <td height="75"></td>
        </tr>
      </div>
    <div>
      <h1 className='h1'>Marketplace</h1>
      
      <div className='search-container'>
        <input className='search-bar' 
                type="text" 
                value={searchState} 
                onChange = {(e) => handleInputChange(e)} 
                id="search" 
                placeholder="Search for items..."/>
        <button className='search-button' 
                onClick={()=>handleSubmit()} 
                type="submit" 
                class="btn">
                  Search
                </button>
      </div>

      <h1> {errorMessage} </h1>

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
    </>
  );
};
  
export default MarketPlace;