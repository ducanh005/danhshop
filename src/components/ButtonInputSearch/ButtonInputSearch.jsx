import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
const ButtonInputSearch =(props) => {
    const {size, placeholder,textButton,bordered,backgroundColorInput='#fff',backgroundColorButton='rgb(13,92,182)',colorButton ='#fff'} = props;
    return ( <div style={{display:'flex',backgroundColor:'#ff'}}>
        <InputComponent
         size={size} 
         placeholder={placeholder} 
         bordered={bordered} 
         style={{backgroundColor:backgroundColorInput}}  />
        <ButtonComponent
         size={size} 
         icon={<SearchOutlined color={colorButton} style={{color:'#fff'}}/>} 
          styleButton={{background:backgroundColorButton,color:colorButton, border:!bordered && 'none'}} 
           textButton={textButton} styleTextButton={{color:colorButton}}> </ButtonComponent>
    </div> );
}

export default ButtonInputSearch;