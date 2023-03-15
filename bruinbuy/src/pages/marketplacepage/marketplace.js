import React from 'react';
import {useState, useEffect} from 'react';
import {db, storage} from '../../firebase-config';
import { getFirestore, collection, collectionGroup, getDoc, getDocs, QuerySnapshot, query, where, get, doc, onSnapshot} from 'firebase/firestore';
import './marketplace.css';
import defaultPic from "./../default-placeholder.png";
import { async } from '@firebase/util';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

function MarketPlace() {
  const [items, setItems] = useState([]);
  const [searchState, setSearchState] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [totalItemsNum, setTotalItemsNum] = useState(0);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");
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
    setTotalItemsNum(items.length)
  }, [items]);

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    setSearchState(value)
  }

  const handleSubmit = async() => {
    setErrorMessage('');

    //pull every item in the allItems collection
    const querySnapshot = await getDocs(collectionGroup(db, 'allItems'))
    
    //check to see if there is match in itemDesc, itemName, and tags
    const data = [];
    querySnapshot.forEach((doc) => {
      if(doc.data().itemName.includes(searchState) || doc.data().itemDesc.includes(searchState) || (doc.data().tags && doc.data().tags.includes(searchState))){
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      }
    })
    setItems(data)
  

    //if not, send error message
    if(!data.length){
      setErrorMessage("No results!");
    }
  }

  const handleSort = async(value) => {
    setSortOption(value)
    setSortOpen(false)
    if(value == 'Price ↑'){
      items.sort((a, b) => a.itemPrice - b.itemPrice).reverse()
    }
    if(value == 'Price ↓'){
      items.sort((a, b) => a.itemPrice - b.itemPrice)
    }
    if(value == 'Oldest'){
      items.sort((a, b) => a.time - b.time)
    }
    if(value == 'Newest'){
      items.sort((a, b) => a.time - b.time).reverse()
    }
  }

  const parseDate = (item) => {
var diff = parseInt(((Date.now()/1000)-item.time.seconds), 10);
    if(diff < 86400){
      return parseInt(diff % (3600*24) / 3600) + " hours"
    } else if (diff == 1) {return diff + " day"}
    else return parseInt(diff / (3600*24)) +  " days"
  }

  return (
    <>
    <div>
        <tr>
        <td height="75"></td>
        </tr>
      </div>
    <div>
      <h1>Marketplace</h1>
      
      <div className='search-container'>
        <input className='search-bar' 
                type="text" 
                value={searchState} 
                onChange = {(e) => handleInputChange(e)} 
                id="search" 
                placeholder="Search for items..."/>
        <button className='search-button' 
                onClick={()=>handleSubmit()} 
                type="submit">
                  Search
                </button>
      </div>
      <hr className='divider'></hr>
      <div className='results-bar'>
        <p className='results-display'> {totalItemsNum} results </p>
        <div className='dropdown-menu'>
          {sortOpen ? (
            <div>
              <button className='sort-options' 
              value="Price ↑"
              onClick={e => handleSort(e.target.value)}>
                Price ↑</button>
              <button className='sort-options' 
              value="Price ↓"
              onClick={e => handleSort(e.target.value)}>
                Price ↓</button> 
              <button className='sort-options' 
              value="Oldest"
              onClick={e => handleSort(e.target.value)}>
                Oldest</button> 
              <button className='sort-options' 
              value="Newest"
              onClick={e => handleSort(e.target.value)}>
                Newest</button> 
            </div>
          ) : null}
          <button className='sort-button' onClick={() => setSortOpen(!sortOpen)}>{sortOption}</button>
          </div>
      </div>
      <h2> {errorMessage} </h2>

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
              <p>{parseDate(item)} ago</p>
            </div>
          </div>
        })}
      </div>

    </div>
    </>
  );
};
  
export default MarketPlace;