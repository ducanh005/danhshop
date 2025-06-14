import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrraperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import Slider1 from '../../assest/images/Slider1.jpg';
import Slider2 from '../../assest/images/Slider2.jpg';
import { Card } from 'antd';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperButton } from './style';
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
              <div id='container' style={{backgroundColor:'#efefef',padding:'0 120px', height:'1000px',width:'100%'}} >
                  <SliderComponent arrImages={[Slider1, Slider2]}/>
                  <div style={{marginTop: '20px', display: 'flex',alignItems: 'center',gap:'30px', flexWrap:'wrap'}}>
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                  </div>
                    <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
                      <WrapperButton textButton="Xem thêm " type="outline" styleButton={{
                        border: '1px solid rgb(11,116,229)', color:'rgb(11,116,229)',
                        width:'240px', height:'38px',borderRadius:'4px'
                      }} styleTextButton={{fontWeight: 500}}></WrapperButton>   
                    </div>
                  </div>
          
       
        </>
    
);
}

export default HomePage;