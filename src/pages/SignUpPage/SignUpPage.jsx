import {WrapperTextLight,WrapperContainerRight,WrapperContainerLeft} from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import imageLogo from '../../assest/images/logo-log-in.png'
import { Image} from 'antd'
import { useState } from 'react'
import { EyeFilled,EyeInvisibleFilled  } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
const SignUpPage = () => {
  const[isShowPassword, setIsShowPassword] = useState(false)
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmpassword, setConfirmPassword] = useState('')
  const handleOnchangeEmail = (value) => {
    setEmail(value)
  }

  const handleOnchangePassword = (value) => {
    setPassword(value)
  }

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value)
  }

  const handleNavigateSignIn = () => {
    navigate('/sign-in')
  }

  const handleSignup = () => {
  }
  return (
    <div style={{display:'flex', alignItems:'center',justifyContent:'center',background:'rgba(0,0,0,0.53)',height:'100vh'}}>
        <div style={{width:'800px',height:'445px', borderRadius:'6px', backgroundColor:'#fff', display:'flex'}}>
          <WrapperContainerLeft>
            <h1>Xin chào</h1>
            <p>Đăng nhập và tạo tài khoản </p>
            <InputForm style={{marginBottom:'10px'}} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}></InputForm>
            
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
               <InputForm placeholder="password" style={{marginBottom:'10px'}} type={isShowPassword ? "text" : "password"}  
                 value={password} onChange={handleOnchangePassword}></InputForm>
              </div>
               <div style={{position:'relative'}}>
              <span
                onClick={()=>setIsShowConfirmPassword(!isShowConfirmPassword)}
                style={{
                zIndex: 10,
                position:'absolute',
                top:'4px',
                right:'8px'
              }}>
                {
                  isShowConfirmPassword ? (
                    <EyeFilled></EyeFilled>
                  ) : ( 
                    <EyeInvisibleFilled/>
                  )
                }
              </span>
               <InputForm placeholder="confirm password" type={isShowConfirmPassword ? "text" : "password"} 
                value={confirmpassword} onChange={handleOnchangeConfirmPassword}
               ></InputForm>
            </div>
            <ButtonComponent 
                disabled ={!email.length || !password.length || !confirmpassword.length}
                onClick={handleSignup}
                size={40} 
                styleButton={{
                  background:'rgb(255,57,69)',
                  height:'48px',
                  width:'100%',
                  border:'none',
                  borderRadius:'4px',
                  margin:'26px 0 10px'}} 
                textButton={'Đăng ký '}
                 styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}></ButtonComponent>
            <p>Bạn đã có tài khoản? <span><WrapperTextLight onClick={handleNavigateSignIn}>Đăng nhập</WrapperTextLight></span></p>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <Image src={imageLogo} preview={false} alt='image-logo' height="203px" width="203px"/>
            <h4>Mua sắm tại DANHSHOP</h4>
          </WrapperContainerRight>
        </div>
      </div>
  );
}
export default SignUpPage;