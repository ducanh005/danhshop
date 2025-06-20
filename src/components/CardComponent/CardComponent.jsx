import React from "react";
import { StyleNameProduct, WrapperDiscountText, WrapperReportText ,WrapperPriceText} from "./style";
import { StarFilled  } from "@ant-design/icons";
import { WrapperCardStyle } from "./style";
import official_logo from '../../assest/images/official_logo.png';
import { Image } from "antd";
import { WrapperImageStyle } from "./style";
import {WrapperStyleTextSell} from "./style";
const CardComponent = ({ }) => {
  return (
  <WrapperCardStyle
    hoverable
    headStyle={{ height: '200px',width:'200px' }}
    style={{ width: 200 }}
    bodyStyle={{ padding: '10px' }}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <img alt="logo" src={official_logo} style={{width:'68px', height:'14px', position:'absolute',top:-1, left:-1,
      borderTopLeftRadius: '3px'
    }}></img>
    <StyleNameProduct>Iphone</StyleNameProduct>
    <WrapperReportText>
       <span style={{marginRight: '4px'}}>
            <span>4.96</span>
            <StarFilled style={{fontSize:'12px', color:'yellow'}}/>
       </span>
        <WrapperStyleTextSell>| Đã bán 1000+  </WrapperStyleTextSell>
    </WrapperReportText>
        <WrapperPriceText>
            <span style={{marginRight:'8px'}}>1.000.000Đ</span>
             <WrapperDiscountText>
                -5%
            </WrapperDiscountText>
        </WrapperPriceText>
  </WrapperCardStyle>
  );
}

export default CardComponent;