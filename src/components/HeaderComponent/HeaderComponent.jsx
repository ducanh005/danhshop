import {  Col } from 'antd';
import React from 'react';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderCol, WrapperTextHeaderSmall } from './style';
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {Badge} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HeaderComponent =() => {

        const navigate = useNavigate();
        const user = useSelector((state) => state.user);
        console.log('user', user)
        const handleNavigateLogin = () => {
            navigate('/sign-in')
        }

    return ( <div style={{width:'100%', background:'rgb(26,148,255)',display:'flex', justifyContent:'center'}}>
        <WrapperHeader >
            <Col span={5}>
                <WrapperHeaderCol>DANHSHOP</WrapperHeaderCol>
            </Col>
            <Col span={13}> 
                <ButtonInputSearch
                size='large'
                textButton="Tìm kiếm"
                placeholder="Tìm kiếm sản phẩm"
               
              ></ButtonInputSearch>
            </Col>
            <Col span={6} style={{display:'flex', gap:'54px',alignItems:'center'}}>
                <WrapperHeaderAccount>
                    <UserOutlined style={{fontSize:'30px'}}/>

                        {user?.name ? (
                            <div style={{cursor:'pointer'}}>{user.name}</div>
                        ):(
                            <div onClick={handleNavigateLogin} style={{cursor:'pointer'}}>
                                <WrapperTextHeaderSmall>Đăng nhập/Đăng ký </WrapperTextHeaderSmall>
                            <div>
                                <WrapperTextHeaderSmall>Tài Khoản  </WrapperTextHeaderSmall>
                                <CaretDownOutlined></CaretDownOutlined>
                                </div>
                            </div>
                        )}
                    
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