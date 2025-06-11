import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrraperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import Slider1 from '../../assest/images/Slider1.jpg';
import Slider2 from '../../assest/images/Slider2.jpg';
import { Card } from 'antd';
import CardComponent from '../../components/CardComponent/CardComponent';
const HomePage =() => {
    const arr =['TV', 'Laptop', 'Phone'] ;
    return (
        <>
             <div style={{padding: '0 120px'}}>
            <WrraperTypeProduct>
                {arr.map((item, index) => {
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
        })}
            </WrraperTypeProduct>
         </div>
              <div id='container' style={{backgroundColor:'#efefef',padding:'0 120px', height:'1000px'}} >
                  <SliderComponent arrImages={[Slider1, Slider2]}/>
                  <div style={{marginTop: '20px', display: 'flex',alignItems: 'center', gap: '20px'}}>
                    <CardComponent />
                  </div>
                  </div>
          
       
        </>
    
);
}

export default HomePage;