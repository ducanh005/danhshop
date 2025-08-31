import { WrapperInputNumber, WrapperQualityProduct } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader} from "./style";
import { Checkbox } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const OrderPage =() => {
    const order = useSelector((state) => state.order)
    console.log('order', order)
    const onChange = (e)=>{
        console.log(e)
    }
    const handleChangeCount = (type)=>{

    }
    const handleOnchangeCheckAll = (e)=>{

    }
    return ( 
        <div style={{background:'#f5f5f5', width:'100%', height:'100vh'}}>
            <div style={{height:'100%', width:'1270px', margin:'0 auto'}}>
                <h3>Giỏ hàng</h3>
                <div style={{display:'flex', justifyContent:'center'}}>
                <WrapperLeft>
                    <WrapperStyleHeader>
                      <span style={{display:'inline-block',width:'390px'}}>
                        <Checkbox onChange={handleOnchangeCheckAll}></Checkbox>  
                        <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                      </span>  
                      <div style={{flex:1,display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                        <span>Đơn giá</span>
                        <span>Số lượng</span>
                        <span>Thành tiền </span>
                        {/* <DeleteOutlined style={{cursor:'pointer'}}/> */}
                      </div>
                    </WrapperStyleHeader>
                    <WrapperListOrder>
                      {order.orderItems?.map((order)=>{
                        
                        return(
                        <WrapperItemOrder>
                        <div style={{width:'390px', display:'flex', alignItems:'center', gap:'4'}}>
                            <Checkbox onChange={onChange}></Checkbox>
                            {/* <img src={imag} style={{width:'77px', height:'79px', objectFit:'cover'}} src="https://cf.shopee.vn/file/vn-50009109-22100-9f1f3e3e2f4d3b5e8f3d6d2b6d4c3e4a_tn" alt="image product"/> */}
                            <span>{order?.name} </span>
                        </div>
                        <div style={{flex:1, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                           <span>
                              <span style={{color:'#242424', fontSize:'13px'}}>{order?.price}</span>
                              <WrapperPriceDiscount>
                                {order?.amount} 
                              </WrapperPriceDiscount>
                           </span>
                        </div>
                        <WrapperCountOrder>
                          <button style={{border:'none',background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('decrease')}>
                            <MinusOutlined style={{color:'#000',fontSize:'10px'}} />
                          </button>
                          <WrapperInputNumber onChange={onChange} defaultValue={order?.amount} value={order?.amount} size="small" ></WrapperInputNumber>
                          <button style={{border:'none',background:'transparent', cursor:'pointer'}} onClick={()=>handleChangeCount('increase')}>
                            <PlusOutlined style={{color:'#000',fontSize:'10px'}} />
                          </button>
                        </WrapperCountOrder>
                        <span style={{color:'rgb(255,66,78', fontSize:'13px', fontWeight:500}}>{order?.price * order?.amount}</span>
                        <DeleteOutlined style={{cursor:'pointer'}}/>
                      </WrapperItemOrder>
                        )
                      })}
                    </WrapperListOrder>
                </WrapperLeft>
                <WrapperRight>
                  <div style={{width:'100%'}}>
                    <WrapperInfo>
                      <div style={{display:'flec',alignItems:'center',justifyContent:'space-between'}}>
                        <span>Tạm tính</span>
                        <span style={{color:'#000', fontSize:'14px',fontWeight:'bold'}}>0</span>
                      </div>
                      <div style={{display:'flec',alignItems:'center',justifyContent:'space-between'}}>
                        <span>Giảm giá</span>
                        <span style={{color:'#000', fontSize:'14px',fontWeight:'bold'}}>0</span>
                      </div>
                    </WrapperInfo>
                  </div>
                </WrapperRight>
                </div>
            </div>

        </div>
    
    );
}

export default OrderPage;