import { WrapperInputNumber, WrapperQualityProduct } from "../../components/ProductDetailsComponent/style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperTotal} from "./style";
import { Button, Checkbox } from "antd";
import imag from "../../assest/images/Slider1.jpg"
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from "../../redux/slides/orderSlides";
import { useState } from "react";
const OrderPage =() => {
    const order = useSelector((state) => state.order)
    const [listChecked,setListChecked] = useState([])
    const dispatch = useDispatch();
    const onChange = (e)=>{
      if(listChecked.includes(e.target.value)){
        const newListChecked = listChecked.filter((item) => item !== e.target.value)
        setListChecked(newListChecked)
      }else{
        setListChecked([...listChecked,e.target.value])
      }
    }


    const handleChangeCount = (type,idProduct)=>{
      if(type === 'increase') {
        dispatch(increaseAmount({idProduct}))
      }else {
        dispatch(decreaseAmount({idProduct}))
      }
    }
    const handleOnchangeCheckAll = (e)=>{
      if(e.target.checked){
        const newListChecked = []
        order?.orderItems?.forEach((item) => 
          newListChecked.push(item?.product))
        setListChecked(newListChecked)
      }else{
        setListChecked([])
      }
    }

    const handleDeleteOrder = (idProduct)=>{
      dispatch(removeOrderProduct({idProduct}))
    }

    const handleRemoveAllOrder = ()=>{
      if(listChecked?.length > 1){
        dispatch(removeAllOrderProduct({listChecked}))

      }
    }
    return ( 
        <div style={{background:'#f5f5f5', width:'100%', height:'100vh'}}>
            <div style={{height:'100%', width:'1270px', margin:'0 auto'}}>
                <h3>Giỏ hàng</h3>
                <div style={{display:'flex', justifyContent:'center'}}>
                <WrapperLeft>
                    <WrapperStyleHeader>
                      <div className="col-checkbox">
                        <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length}  ></Checkbox>  
                        <span>Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                      </div>
                      <div className="col-price">Đơn giá</div>
                      <div className="col-quantity">Số lượng</div>
                      <div className="col-total">Thành tiền</div>
                      <div className="col-action">
                        <DeleteOutlined style={{cursor:'pointer'}} onClick={handleRemoveAllOrder}></DeleteOutlined>
                      </div>
                    </WrapperStyleHeader>
                    <WrapperListOrder>
                      {order.orderItems?.map((order) => (
                        <WrapperItemOrder key={order?.product}>
                          <div className="col-checkbox">
                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)}></Checkbox>
                            <img src={order?.image} style={{width:'77px', height:'79px', objectFit:'cover'}}></img>
                            <div style={{width:260, overflow:'hidden', textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{order?.name}</div>
                          </div>
                          <div className="col-price">{order?.price}</div>
                          <div className="col-quantity">
                            <WrapperCountOrder>
                              <button style={{border:'none',background:'transparent', cursor:'pointer'}} onClick={() => handleChangeCount('decrease', order?.product)}>
                                <MinusOutlined style={{color:'#000',fontSize:'10px'}}/>
                              </button>
                              <WrapperInputNumber value={order?.amount} size="small" />
                              <button style={{border:'none',background:'transparent', cursor:'pointer'}} onClick={() => handleChangeCount('increase', order?.product)}>
                                <PlusOutlined style={{color:'#000',fontSize:'10px'}}/>
                              </button>
                            </WrapperCountOrder>
                          </div>
                          <div className="col-total">{order?.price * order?.amount}</div>
                          <div className="col-action">
                            <DeleteOutlined onClick={() => handleDeleteOrder(order?.product)} />
                          </div>
                        </WrapperItemOrder>
                      ))}
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
                      <div style={{display:'flec',alignItems:'center',justifyContent:'space-between'}}>
                        <span>Thuế</span>
                        <span style={{color:'#000', fontSize:'14px',fontWeight:'bold'}}>0</span>
                      </div>
                      <div style={{display:'flec',alignItems:'center',justifyContent:'space-between'}}>
                        <span>Phí giao hàng</span>
                        <span style={{color:'#000', fontSize:'14px',fontWeight:'bold'}}>0</span>
                      </div>
                    </WrapperInfo>
                    <WrapperTotal>
                      <span>Tổng tiền</span>
                      <span style={{display:'flex', flexDirection:'column'}}>
                        <span style={{color:'rgb(254,56,52)', fontSize:'24px',fontWeight:'bold'}}>234</span>
                        <span style={{color:'#000', fontSize:'11px'}}>(Đã bao gồm VAT nếu có)</span>
                      </span>
                    </WrapperTotal>
                  </div>
                  <ButtonComponent
                  styleTextButton={{color:'#fff', fontSize:'16px', fontWeight:500}}
                  textButton={"Mua hàng"}
                  size={40}
                  styleButton=
                  {{ 
                    background:'rgb(255,57,69)',
                    height:'48px',
                    width:'220px',
                    border:'none',
                    borderRadius:'4px'}}
                    
                  >
                    
                  </ButtonComponent>
                </WrapperRight>
                </div>
            </div>

        </div>
    
    );
}

export default OrderPage;