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

    useEffect(() => {
        const itemRef = db.collection('allItems').doc(itemId);
        itemRef.get().then((doc) => {
          if (doc.exists) {
            setItem(doc.data());
            console.log("item set!");
          } else {
            console.log('No such document!');
          }
        }).catch((error) => {
          console.log('Error getting document:', error);
        });
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
        <div className="item_Info">
            <h1>Item Info Page</h1>

            <div className="item_Image">
                {images ? (
                    <Slider {...settings}>
                        {images.map((url) => (
                        <div key={url}>
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

            <div className="itemInfo">
                <h2>{item.itemName}</h2>
                <p>{item.itemDesc}</p>
                <p>{item.itemPrice}</p>
                <p>{item.userFullName}</p>
            </div>
        </div>
    );
}

export default ItemInfoPage;
//<p>{images && images.length > 0 && images.map((url) => <img src={url} alt="" />)}</p>