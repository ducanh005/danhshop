import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrraperTypeProduct } from './style';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import Slider1 from '../../assest/images/Slider1.jpg';
import Slider2 from '../../assest/images/Slider2.jpg';
import { Card } from 'antd';
import CardComponent from '../../components/CardComponent/CardComponent';
import { WrapperButton } from './style';
import { WrapperProducts } from './style';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../service/ProductService';
const HomePage =() => {
    const arr =['TV', 'Laptop', 'Phone'] ;
    const fetchProductAll = async () => {
      const res = await ProductService.getAllProduct();
      return res
    }
    const { data: products, isLoading } = useQuery({
      queryKey: ['products'],
      queryFn: fetchProductAll,
      retry: 3,
      retryDelay: 1000,
  });
    console.log('data', products);
    return (
        <>
             <div style={{width:'1270px', margin:'0 auto'}}>
            <WrraperTypeProduct>
                {arr.map((item, index) => {
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
        })}
            </WrraperTypeProduct>
         </div>
              <div className='body' style={{width:'100%',backgroundColor:'#efefef'}}>
                <div id='container' style={{ height:'1000px',width:'1270px', margin:'0 auto'}} >
                    <SliderComponent arrImages={[Slider1, Slider2]}/>
                    <WrapperProducts >
                      {products?.data?.map((product)=>{
                        return (<CardComponent key={product._id}
                          countInStock={product.countInStock}
                          description={product.description} 
                          image={product.image} 
                          name={product.name}
                          price={product.price}
                          rating={product.rating}
                          type={product.type}
                          selled={product.selled}
                          dicount={product.discount}
                          />)
                      })}
                     
                    </WrapperProducts>
                      <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'10px'}}>
                        <WrapperButton textButton="Xem thêm " type="outline" styleButton={{
                          border: '1px solid rgb(11,116,229)', color:'rgb(11,116,229)',
                          width:'240px', height:'38px',borderRadius:'4px'
                        }} styleTextButton={{fontWeight: 500}}></WrapperButton>   
                      </div>
                    </div>
              </div>
          
       
        </>
    
);
}

export default HomePage;