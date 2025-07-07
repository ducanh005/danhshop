import {  Button, Col, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { WrapperHeader, WrapperHeaderAccount, WrapperHeaderCol, WrapperTextHeaderSmall } from './style';
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {Badge} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { WrapperContentPopup } from './style';
import * as UserService from '../../service/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';
const HeaderComponent =() => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const user = useSelector((state) => state.user);
        const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const handleNavigateLogin = () => {
            navigate('/sign-in')
        }
        const handleLogout = async () => {
            setLoading(true);
            await UserService.logoutUser();
            dispatch(resetUser());
            setLoading(false);
        }

        useEffect(() => {
            setLoading(true);
            setUsername(user?.name)
            setLoading(false);
        },[user.name])

        const content = (
            <div>
                <WrapperContentPopup onClick={handleLogout}>Đăng xuất </WrapperContentPopup>
                <WrapperContentPopup onClick={()=>navigate('/profile-user')}>Thông tin người dùng </WrapperContentPopup>
            </div>
        )


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
              <Loading isPending={loading}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{fontSize:'30px'}}/>
    
                            {user?.access_token ? (
                               <> 
                            <Popover content={content} trigger="click">
                                <div style={{cursor:'pointer'}}>{username.length ? username: user?.email}</div>
                            </Popover>
                               </>
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
              </Loading>
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