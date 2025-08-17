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
import  {searchProduct}  from '../../redux/slides/productSlide';
const HeaderComponent =({isHiddenSearch = false ,isHiddenCart= false}) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const user = useSelector((state) => state.user);
        const [loading, setLoading] = useState(false);
        const [username, setUsername] = useState('');
        const [userAvatar, setUserAvatar] = useState('');
        const [search,setSearch] = useState('');
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
            setUserAvatar(user?.avatar);
            setLoading(false);
        },[user.name, user?.avatar])

        const content = (
            <div>
                <WrapperContentPopup onClick={()=>navigate('/profile-user')}>Thông tin người dùng </WrapperContentPopup>
                {user?.isAdmin && (
                    <WrapperContentPopup onClick={()=>navigate('/system/admin')}>Quản lí hệ thống  </WrapperContentPopup>
                )}
                <WrapperContentPopup onClick={handleLogout}>Đăng xuất </WrapperContentPopup>
            </div>
        )

        const onSearch = (e) => {
            setSearch(e.target.value);
            dispatch(searchProduct(e.target.value));
        }

    return ( <div style={{width:'100%', background:'rgb(26,148,255)',display:'flex', justifyContent:'center'}}>
        <WrapperHeader style={{justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset'}}>
            <Col span={5}>
                <WrapperHeaderCol>DANHSHOP</WrapperHeaderCol>
            </Col>
            {!isHiddenSearch && (
                <Col span={13}> 
                    <ButtonInputSearch
                    size='large'
                    textButton="Tìm kiếm"
                    placeholder="Tìm kiếm sản phẩm"
                    onChange={onSearch}
                ></ButtonInputSearch>
                </Col>

            )}
            <Col span={6} style={{display:'flex', gap:'54px',alignItems:'center'}}>
              <Loading isPending={loading}>
                    <WrapperHeaderAccount>
                        {userAvatar?(
                            <img src={userAvatar} alt='avatar' style={{
                          height:'30px',
                          width:'30px',
                          borderRadius:'50%',
                          objectFit:'cover',
                        }} ></img>
                        ): 
                        (
                            <UserOutlined style={{fontSize:'30px'}}/>
                        )}
    
                            {user?.access_token ? (
                               <> 
                            <Popover content={content} trigger="click" >
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
              {!isHiddenCart && (
                <div onClick={()=>navigate('/order')} style={{cursor:'pointer'}}>
                    <Badge count={4} size="small">
                        <ShoppingCartOutlined style={{fontSize:'30px',color:'#fff'}}/>
                    </Badge>
                        <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
                </div>
              )}
                </Col>
        </WrapperHeader>
    </div> );
}

export default HeaderComponent;