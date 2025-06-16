import React from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row,Col } from "antd";
import { WrapperProducts } from "./style";
import { WrraperNavbar } from "./style";
import { Pagination } from 'antd';
const TypeProductPage = () => {
  const onChange= () => {

  }
    return (
        <div style={{padding:'0 120px',background:'#efefef',}}>
          <Row style={{ flexWrap:'nowrap', paddingTop:'10px'}}>
            <WrraperNavbar span={4} >
                  <NavBarComponent></NavBarComponent>
            </WrraperNavbar>
            <Col span={20}>
               <WrapperProducts >
                  <CardComponent></CardComponent>
                  <CardComponent></CardComponent> 
                  <CardComponent></CardComponent> 
                  <CardComponent></CardComponent> 
                  <CardComponent></CardComponent> 
                  <CardComponent></CardComponent>
                  <CardComponent></CardComponent> 
                  <CardComponent></CardComponent> 
               </WrapperProducts>
              <Pagination  defaultCurrent={2} total={100} onChange={onChange} style={{textAlign: 'center', marginTop:'10px'}}/>
            </Col>
          </Row>
        </div> );
}
export default TypeProductPage;