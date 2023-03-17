import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router';
import 'firebase/firestore'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {db} from '../../firebase-config';
import './itemInfo.css';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function ItemInfoPage(props){
    const {itemId, agoString} = useParams();
    const location = useLocation();
    const images = location.state ? location.state.images : null;
    const [item, setItem] = useState(null);
    const [sellerFullName, setSellerFullName] = useState("hiiii");

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
        <div className='item_page'>
          <div>
            <tr>
              <td height="75"></td>
            </tr>
          </div>
            <h1>Item Info Page</h1>
            <div className='itemContainer'>
              <div className="item_Left">
                  {images ? (
                      <Slider {...settings}>
                          {images.map((url) => (
                          <div className="item_Image" key={url}>
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
                    <p style={{fontWeight: 'bolder'}}>${item.itemPrice}</p>
                    <p>{item.itemDesc}</p>
                    <Link to={`/chat?seller=${sellerFullName}`} className='link-button'>Chat with Seller: {sellerFullName}</Link>
                    
                    <div className='info_bottom'>
                      <p style={{color: 'red'}}>Only {item.itemQuantity} left!</p>
                      <p>Posted {agoString}</p>                      
                    </div>

                </div>



              </div>
            </div>
        </div>
    );
}

export default ItemInfoPage;