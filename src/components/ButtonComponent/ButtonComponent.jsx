import React from "react";
import { Button } from "antd";
const ButtonComponent = ({size, styleButton, styleTextButton,textButton, ...rest}) => {
    return (
        <div>
        <Button
         size={size} 
        style={styleButton} 
        {...rest}>
         <span style={styleTextButton}>{textButton}</span></Button>
        </div>
    );
}

export default ButtonComponent;