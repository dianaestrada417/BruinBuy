import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import 'firebase/firestore'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {db} from '../../firebase-config';
import './itemInfo.css';

function ItemInfoPage(props){
    const {itemId} = useParams();
    const location = useLocation();
    const images = location.state ? location.state.images : null;
    const [item, setItem] = useState(null);
    const [sellerFullName, setSellerFullName] = useState("");

    useEffect(() => {
      const getItemData = async () =>{
        const itemRef = db.collection('allItems').doc(itemId);
        const itemData = await itemRef.get();
        if(itemData.exists) {
          setItem(itemData.data());
          console.log("item loaded", itemData.data())

          const sellerRef = db.collection("signups").doc(itemData.data().user);
          const sellerData = await sellerRef.get();
          if(sellerData.exists){
            const sellerDataObj = sellerData.data();
            setSellerFullName(sellerDataObj.fullName);
          }
        }
      };
      getItemData();  
    }, [itemId]);  



    if (!item) {
        return <div>
            <h1>Loading.....</h1>
        </div>
    }

    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };

    return(
        <div className="page">
            <h1>Item Info Page</h1>
            <div className='itemContainer'>
              <div className="item_Left">
                  {images ? (
                      <Slider {...settings}>
                          {images.map((url) => (
                          <div className="itemImage" key={url}>
                              <img src={url} alt="" />
                          </div>
                          ))}
                      </Slider>
                      
                  ): (
                      <div>
                          <p>No images available...</p>
                      </div>
                  )}


              </div>
              
              <div className="item_Right">
                <div className="item_Info">
                    <h2>{item.itemName}</h2>
                    <p>{item.itemDesc}</p>
                    <p>{item.itemPrice}</p>
                    <p>{item.userFullName}</p>
                </div>


                <div className='chatWith'>
                    <p>Chat with Seller</p>
                    <p>Ask {sellerFullName}</p>
                </div>
              </div>
            </div>
        </div>
    );
}

export default ItemInfoPage;