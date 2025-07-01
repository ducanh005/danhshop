import { Row ,Col,Image} from "antd";
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import a from '../../assest/images/Slider2.jpg';
import b from '../../assest/images/Slider1.jpg';
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { InputNumber } from "antd";
import {WrapperBtnQualityProduct,WrapperInputNumber,WrraperStyleImageSmall,WrapperQualityProduct,WrraperStyleColImage,WrapperStyleNameProduct, WrapperStyleTextSell,WrapperPriceProduct,WrapperPriceTextProduct,WrapperAddressProduct} from "./style";
const ProductDetailsComponent = () => {
  const onChange = (value) => {}
  return (
    <Row style={{padding:'16px', background:'#fff', borderRadius:'4px'}}>
        <Col span={10} style={{borderRight:'1px solid #e5e5e5',paddingRight:'8px'}}>
            <Image src={a} alt="image product" preview={false}></Image>
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
          <WrapperStyleNameProduct>Sach tham tu lung danh conan</WrapperStyleNameProduct>
          <div>
            <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)'}}></StarFilled>
            <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)'}}></StarFilled>
            <StarFilled style={{fontSize:'12px',color:'rgb(253,216,54)'}}></StarFilled>
            <WrapperStyleTextSell>| Đã bán 1000 </WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>200.000</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến</span>
            <span className="address">Chu van an . TP.Lang Son</span>
            <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <div style={{margin:'10px 0 20px ', borderTop:'1px solid #e5e5e5',borderBottom:'1px solid #e5e5e5',padding:'10px 0'}}>
            <div style={{marginBottom:'10px'}}>Số lượng</div>
            <WrapperQualityProduct  > 
              <button style={{border:'none' , background:'transparent'}}>
                <MinusOutlined  style={{color:'#000', fontSize:'20px'}} size="10"/>
              </button>
            <WrapperInputNumber defaultValue={3} onChange={onChange} size="small" ></WrapperInputNumber>
              <button style={{border:'none', background:'transparent'}}>
                <PlusOutlined  style={{color:'#000', fontSize:'20px'}} size="10"/>
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
  );
}
export default ProductDetailsComponent;