import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import { WrraperTypeProduct } from './style';

const HomePage =() => {
    const arr =['TV', 'Laptop', 'Phone'] ;
    return ( <div style={{padding: '0 120px'}}>
        <WrraperTypeProduct>
            {arr.map((item, index) => {
                return(
                    <TypeProduct name={item} key={item}/>
                )
    })}
        </WrraperTypeProduct>
        
    </div>
    
);
}

export default HomePage;