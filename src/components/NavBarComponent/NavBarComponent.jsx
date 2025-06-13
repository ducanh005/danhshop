import React from "react";
import { WrapperLableText } from "./style";
import { WrraperTextValue } from "./style";
import { WrraperContent } from "./style";
import { WrraperTextPrice } from "./style";
import { Checkbox } from 'antd';
import { Rate } from 'antd';
const NavBarComponent = () => {
    const onChange = (checkedValues) => {}
    const renderContent =(type,options)=>{
        switch(type){
            case 'text':
                return options.map((option)=>{
                    return (
                    <WrraperTextValue>{option}</WrraperTextValue>
                )
                });
                case 'checkbox':
                    return (<Checkbox.Group style={{ width: '100%',display:'flex',flexDirection:'column', gap :'12px' }} onChange={onChange}>
                        {options.map((option)=>{
                            return (
                            <Checkbox style={{marginLeft:0}} value={option.value}>{option.label}</Checkbox>)
                        })}
                        </Checkbox.Group>)
                case 'star':
                     return options.map((option)=>{
                            return (
                                <div style={{display:'flex',gap:'4px'}}>
                                    <Rate style={{fontSize:'12px'}} disabled defaultValue={option}  />
                                    <span>{`từ ${option} sao`}</span>
                                </div>
                     )})
                     case 'price':
                     return options.map((option)=>{
                            return (
                                    <WrraperTextPrice >
                                        {option}
                                    </WrraperTextPrice>
                     )})
                  
            default:
                return {}; 
        }
    }
  return (
    <div >
        <WrapperLableText>Lable</WrapperLableText>
       <WrraperContent> {
            renderContent('text',['Tu lanh','TV','May giat'])}
       </WrraperContent>
        <WrraperContent>
                {
                renderContent('checkbox',[
                    {value: 'a', label: 'A'},
                    {value: 'b', label: 'B'},
                ])}
        </WrraperContent>
         <WrraperContent>
                {
                renderContent('star',
                    [3,4,5]
                )}
        </WrraperContent>
         <WrraperContent>
                {
                renderContent('price',
                    ['dưới 40','Trên 50.000']
                )}
        </WrraperContent>
    </div>
  );
}

export default NavBarComponent;