import React from 'react';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import '../../firebase-config';
import {useState, useEffect} from 'react';
import {db} from '../../firebase-config';
import {collectionGroup, getDocs, query, where} from 'firebase/firestore';
import './marketplace.css';
import defaultPic from "./../default-placeholder.png";
import 'react-slideshow-image/dist/styles.css';
import {useNavigate } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function MarketPlace() {
  //const db = firebase.firestore();
  const [items, setItems] = useState([]);
  const [searchState, setSearchState] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [totalItems, setTotalItems] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Sort");
  const [selectedItem, setSelectedItem] = useState(null);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const nav = useNavigate();

  const handleItemClick = (item) => {
    const images = item.images;
    const agoString = `${parseDate(item)} ago`;

    nav(`/item/${item.id}/${agoString}`, {state: {images}});
    setSelectedItem(item.id);
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
        if(prevItem.id === item.id) {
          return {...prevItem, images: imagesData.length ? imagesData : [defaultPic]};
        }
        return prevItem;
      }));
      await new Promise((resolve) => setTimeout(resolve, 1000)); // example async operation
      setImagesUploaded(true);  
    });
    if(items.length == 1){setTotalItems('1 result')}
    else {setTotalItems(items.length + ' results')}
    
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
      var hours = parseInt(diff % (3600*24) / 3600)
      if(hours == 1) {return hours + " hour"}
      else {return hours + " hours"}
    } else if (86400 < diff < 172800) {return "1 day"}
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
        <p className='results-display'> {totalItems} </p>
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
        {items.map((item) => {
          return <div className="item" key={item.id} onClick={() => handleItemClick(item)}> 
            <div className='itemImage'>
              <p>{item.images && item.images.length > 0 && <img src={item.images[0]} alt=""/>}</p>
            </div>
            <div className='itemInfo'>
              <h2>{item.itemName}</h2>
              <p>{item.itemDesc}</p> 
              <div className='itemInfoBottom'>
                <h2>${item.itemPrice}</h2>
                <p>{parseDate(item)} ago</p>
              </div>
            </div>
          </div>
        })}
      </div>

    </div>
    </>
  );
};
  
export default MarketPlace;