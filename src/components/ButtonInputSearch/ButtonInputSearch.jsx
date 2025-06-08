import React from 'react';
import { Button,Input} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const ButtonInputSearch =(props) => {
    const {size, placeholder,textButton,bordered,backgroundColorInput='#fff',backgroundColorButton='rgb(13,92,182)',colorButton ='#fff'} = props;
    return ( <div style={{display:'flex',backgroundColor:'#ff'}}>
        <Input size={size} placeholder={placeholder} bordered={bordered} style={{backgroundColor:backgroundColorInput}}  />
        <Button size={size} icon={<SearchOutlined color={colorButton}/>} style={{backgroundColor:backgroundColorButton,color:colorButton, border:!bordered && 'none'}} > <span style={{color:colorButton}}>{textButton}</span></Button>
    </div> );
}

export default ButtonInputSearch;