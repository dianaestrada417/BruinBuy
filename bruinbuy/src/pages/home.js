import React from 'react';
  
const Home = () => {
    return (
      <div classname='homepage'>
        <background 
          style={{
          display: 'flex',
          height: '1000px',
          backgroundImage: `url(https://s3.amazonaws.com/cms.ipressroom.com/173/files/20198/5d72b4772cfac209ff04c634_Royce+Quad/Royce+Quad_hero.jpg)`,
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
            bottom: -50,
            right: 200,
            left: 200,
            backgroundColor: 'white',
            color: '#071330',
            paddingLeft: 20,
            paddingRight: 20
            }}>
              <p style={{
                fontSize: 25,
                color: '#071330'
              }}>
                BruinBuy is a marketplace for Bruins to post anything they might want to sell. From homemade products to books or furniture, BruinBuy can help you with all of your selling and buying needs!
              </p>
          </textBlock>
        </background> 
      </div>
  );
};
  
export default Home;