import {  Col } from 'antd';
import React from 'react';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderCol, WrapperTextHeaderSmall } from './style';
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {Badge} from 'antd';
const HeaderComponent =() => {
    return ( <div>
        <WrapperHeader gutter={16}>
            <Col span={6}>
                <WrapperHeaderCol>DANHSHOP</WrapperHeaderCol>
            </Col>
            <Col span={12}>
                <ButtonInputSearch
                size='large'
                bordered={false}
                textButton="Tìm kiếm"
                placeholder="Tìm kiếm sản phẩm"
               
              ></ButtonInputSearch>
            </Col>
            <Col span={6} style={{display:'flex', gap:'20px',alignItems:'center'}}>
                <WrapperHeaderAccount>
                    <UserOutlined style={{fontSize:'30px'}}/>
                        <div>
                            <span>Đăng nhập/Đăng ký </span>
                           <div>
                             <span>Tài Khoản  </span>
                             <CaretDownOutlined></CaretDownOutlined>
                             </div>
                        </div>
                    
                </WrapperHeaderAccount>
                <div>
                    <Badge count={4} size="small">
                        <ShoppingCartOutlined style={{fontSize:'30px',color:'#fff'}}/>
                    </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                </div>
                </Col>
        </WrapperHeader>
    </div> );
}

export default HeaderComponent;