import {WrapperTextLight,WrapperContainerRight,WrapperContainerLeft} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assest/images/logo-log-in.png'
import {Divider, Image} from 'antd'
import { use, useEffect, useState } from 'react'
import { EyeFilled,EyeInvisibleFilled  } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import * as UserService from '../../service/UserService'
import { useMutationHooks } from '../../hooks/userMutationHook'
import Loading from '../../components/LoadingComponent/Loading'
import {jwtDecode} from 'jwt-decode' 
import {useDispatch} from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide'
const SignInPage = () => {
  const[isShowPassword, setIsShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleNavigateSignUp = () => {
    navigate('/sign-up')
  }

  const mutation = useMutationHooks(
     data =>UserService.loginUser(data),
     
  )

  const {data, isPending, isSuccess, isError} = mutation

  useEffect(() => {
    const token = localStorage.getItem('access-token');
  const handlePostLogin = async () => {
    if (isSuccess && data?.access_token) {
      localStorage.setItem('access-token', data?.access_token);

      const decoded = jwtDecode(data.access_token);
      if (decoded?.id) {
        await handleGetdetailsUser(decoded.id, data.access_token);
      }

      navigate('/');
    }
  };

  handlePostLogin();
}, [isSuccess]);

  const handleGetdetailsUser = async(id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data,access_token:token}))
  }

  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleSignin = () => {
    mutation.mutate({ email, password })
    console.log('handleSignin', email, password);
  }

  return (
      <div style={{display:'flex', alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.53)',height:'100vh'}}>
        <div style={{width:'800px',height:'445px', borderRadius:'6px', backgroundColor:'#fff', display:'flex'}}>
          <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>Đăng nhập và tạo tài khoản </p>
            <InputForm style={{marginBottom:'10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} ></InputForm>
            <div style={{position:'relative'}}>
              <span
                onClick={()=>setIsShowPassword(!isShowPassword)}
                style={{
                zIndex: 10,
                position:'absolute',
                top:'4px',
                right:'8px'
              }}>
                {
                  isShowPassword ? (
                    <EyeFilled></EyeFilled>
                  ) : ( 
                    <EyeInvisibleFilled/>
                  )
                }
              </span>
              <InputForm placeholder="password" type={isShowPassword ? "text" : "password"} value={password} onChange={handleOnchangePassword} ></InputForm>
            </div>
            {data?.status === 'ERR' && <span style={{color:'red'}}>{data?.message}</span>}
            <Loading  isPending={mutation.isPending} >
                <ButtonComponent 
                  disabled ={!email.length || !password.length }
                  onClick={handleSignin}
                    size={40} 
                    styleButton={{
                      background:'rgb(255,57,69)',
                      height:'48px',
                      width:'100%',
                      border:'none',
                      borderRadius:'4px',
                      margin:'26px 0 10px'}} 
                    textButton={'Đăng nhập'}
                    styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}></ButtonComponent>
            </Loading>
            <p><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p>
            <p>Chưa có tài khoản <span><WrapperTextLight onClick={handleNavigateSignUp}>Tạo tài khoản</WrapperTextLight></span></p>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <Image src={imageLogo} preview={false} alt='image-logo' height="203px" width="203px"/>
            <h4>Mua sắm tại DANHSHOP</h4>
          </WrapperContainerRight>
        </div>
      </div>
  );
}
export default SignInPage;