import React from 'react';
import IMG from "./IMG_0076.jpeg"
  
const Home = () => {
    return (
      <div classname='homepage'>
        <background 
          style={{
          display: 'flex',
          height: '1000px',
          backgroundImage: `url(${IMG})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          justifyContent: 'center'
          }}>
          <h1 style={{
            fontSize: 50,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 0 25px black',
            marginTop: 100
          }}>Welcome to BruinBuy!
          </h1>
          <textBlock style={{
            position: 'absolute',
            top: 550,
            right: 200,
            left: 200,
            backgroundColor: 'transparent',
            color: '#071330',
            paddingLeft: 20,
            paddingRight: 20
            }}>
              <p style={{
                fontSize: 30,
                color: 'white',
                textShadow: '0 0 7px black',
                fontWeight: 'bold',
                letterSpacing: -.5
              }}>
                BruinBuy is a marketplace for Bruins to post anything they might want to sell. From homemade products to books or furniture, BruinBuy can help you with all of your selling and buying needs!
              </p>
          </textBlock>
        </background> 
      </div>
  );
};
  
export default Home;