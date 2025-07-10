import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from './utils';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './service/UserService'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import Loading from './components/LoadingComponent/Loading';
function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        const {storageData ,decoded} =handleDecoded()
            if(decoded?.id){
                handleGetdetailsUser(decoded?.id, storageData)
            }
        setIsLoading(false);
    },[])

    const handleDecoded =()=>{
        let storageData =localStorage.getItem('access-token')
        let decoded = {}
        if(storageData && isJsonString(storageData)){
            storageData = JSON.parse(storageData);
                decoded = jwtDecode(storageData)
        }
        return {decoded, storageData}
    }

    UserService.axiosJWT.interceptors.request.use(async (config) =>{
        const {decoded} =handleDecoded()
        const currentTime = new Date()
        if(decoded?.exp < currentTime.getTime() / 1000){
            const data = await UserService.refreshToken()
            config.headers['token'] = `Bearer ${data?.access_token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    })

      const handleGetdetailsUser = async(id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({...res?.data,access_token:token}))
      }

    return (
        <div>
          <Loading isPending={isLoading} >
            <Router>
                    <Routes>
                       {routes
                        .filter((route) => !route.isPrivate || user.isAdmin)
                        .map((route) => {
                            const Page = route.page;
                            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
                            return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                <Layout>
                                    <Page />
                                </Layout>
                                }
                            />
                            );
                        })}
                    </Routes>
            </Router>
          </Loading>
        </div>
    );
}

export default App;
