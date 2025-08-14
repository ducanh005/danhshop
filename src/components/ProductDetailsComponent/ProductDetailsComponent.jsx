import { Row ,Col,Image, Rate} from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import a from '../../assest/images/Slider2.jpg';
import b from '../../assest/images/Slider1.jpg';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { InputNumber } from "antd";
import {WrapperBtnQualityProduct,WrapperInputNumber,WrraperStyleImageSmall,WrapperQualityProduct,WrraperStyleColImage,WrapperStyleNameProduct, WrapperStyleTextSell,WrapperPriceProduct,WrapperPriceTextProduct,WrapperAddressProduct} from "./style";
import * as ProductService from '../../service/ProductService';
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../LoadingComponent/Loading";
import {useSelector} from 'react-redux';
const ProductDetailsComponent = ({idProduct}) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const onChange = (value) => {
    setNumProduct(Number(value));
  }
  const fetchGetDetailsProduct = async(context)=>{
    const id = context?.queryKey && context?.queryKey[1]
    if(id){
      const res =await ProductService.getDetailsProduct(id)
      return res.data;
    }
    
  }
  
  

  const { isLoading, data: productDetails } = useQuery({
    queryKey: ['products-details', idProduct],
    queryFn: fetchGetDetailsProduct,
    enabled: !!idProduct
  });

  const handleChangeCount = (type) => {
    if(type === 'increase'){
      setNumProduct(numProduct +1);
    } else if(type === 'decrease'){
      setNumProduct(numProduct - 1);
    }
  }
  return (
    <Loading isPending={isLoading}>
      <Row style={{padding:'16px', background:'#fff', borderRadius:'4px'}}>
          <Col span={10} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
              <Image src={productDetails?.image} alt="image product" preview={false}></Image>
              <Row style={{paddingTop:'10px', justifyContent:'space-between', }} >
                  <WrraperStyleColImage span={4} >
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
                  <WrraperStyleColImage span={4}>
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
                  <WrraperStyleColImage span={4}>
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
                  <WrraperStyleColImage span={4}>
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
                  <WrraperStyleColImage span={4}>
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
                  <WrraperStyleColImage span={4}>
                    <WrraperStyleImageSmall src={b} alt="image small" preview={false}></WrraperStyleImageSmall>
                  </WrraperStyleColImage>
              </Row>
          </Col>
          <Col span={14} style={{paddingLeft:'10px'}}>
            <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
            <div>
              <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}/>              
              <WrapperStyleTextSell>| Đã bán 1000 </WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>{productDetails?.price}</WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <WrapperAddressProduct>
              <span>Giao đến</span>
              <span className="address">{user?.address}</span>
              <span className="change-address">Đổi địa chỉ</span>
            </WrapperAddressProduct>
            <div style={{margin:'10px 0 20px ', borderTop:'1px solid #e5e5e5',borderBottom:'1px solid #e5e5e5',padding:'10px 0'}}>
              <div style={{marginBottom:'10px'}}>Số lượng</div>
              <WrapperQualityProduct  > 
                <button style={{border:'none' , background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('decrease')}>
                  <MinusOutlined  style={{color:'#000', fontSize:'20px'}} size="10" />
                </button>
              <WrapperInputNumber  onChange={onChange} defaultValue={1} value={numProduct} size="small" ></WrapperInputNumber>
                <button style={{border:'none', background:'transparent' ,cursor:'pointer'}} onClick={()=>handleChangeCount('increase')}>
                  <PlusOutlined  style={{color:'#000', fontSize:'20px'}} size="10" />
                </button>
              </WrapperQualityProduct>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
              <ButtonComponent 
                size={40} 
                styleButton={{background:'rgb(255,57,69)',height:'48px',width:'220px',border:'none',borderRadius:'4px'}} 
                textButton={'Chọn mua '} styleTextButton={{color:'#fff',fontSize:'15px',fontWeight:'700'}}></ButtonComponent>
                <ButtonComponent 
                size={40} 
                styleButton={{background:'#fff',height:'48px',width:'220px',border:'none',borderRadius:'4px',border:'1px solid rgb(13,92,182)'}} 
                textButton={'Mua trả sau '} styleTextButton={{color:'rgb(13,92,182)',fontSize:'15px'}}></ButtonComponent>
            
            </div>
            
          </Col>
      </Row>
    </Loading>
  );
}
export default ProductDetailsComponent;