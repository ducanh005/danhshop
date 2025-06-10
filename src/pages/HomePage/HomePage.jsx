import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrraperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import Slider1 from '../../assest/images/Slider1.jpg';
import Slider2 from '../../assest/images/Slider2.jpg';
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
              <div id='container' style={{backgroundColor:'#efefef',padding:'0 120px'}} >
                  <SliderComponent arrImages={[Slider1, Slider2]}/>
                  </div>
          
       
        </>
    
);
}

export default HomePage;