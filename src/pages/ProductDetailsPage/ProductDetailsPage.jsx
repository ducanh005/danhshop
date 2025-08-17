import { useNavigate, useParams } from "react-router-dom";
import ProductDetailsComponent from "../../components/ProductDetailsComponent/ProductDetailsComponent";
const ProductDetailsPage = () => {
  const {id} = useParams()
  const navigate = useNavigate();
  return (
    <div style={{height:'100vh', width:'100%',background:'efefef'}}>
      <div styles={{width:'1270px', margin:'0 auto', height:'100%'}}>
        <h5><span style={{cursor:'pointer', fontWeight:'bold'}} onClick={()=> {navigate('/')}}>Trang chủ</span>- Chi tiết sản phẩm </h5>
          <ProductDetailsComponent idProduct={id}/>
      </div>
    </div>
  );
}
export default ProductDetailsPage;