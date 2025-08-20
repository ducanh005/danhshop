import React, { useEffect, useState } from "react";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Row, Col, Pagination } from "antd";
import { WrapperProducts, WrraperNavbar } from "./style";
import { useLocation } from "react-router-dom";
import * as ProductService from "../../service/ProductService";
import Loading from "../../components/LoadingComponent/Loading";
import { useSelector } from "react-redux";
import { useDebounce } from "../../hooks/useDebounce";

const TypeProductPage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);

  const { state } = useLocation();
  const [products, setProducts] = useState([]); // dữ liệu gốc
  const [filteredProducts, setFilteredProducts] = useState([]); // dữ liệu sau lọc
  const [loading, setLoading] = useState(false);
  const [panigate, setPanigate] = useState({
    page: 0,
    limit: 10,
    total: 1,
  });

  // Fetch sản phẩm theo loại
  const fetchProductType = async (type, page, limit) => {
    setLoading(true);
    const res = await ProductService.getProductType(type, page, limit);
    if (res?.status === "OK") {
      setProducts(res?.data); // lưu dữ liệu gốc
      setFilteredProducts(res?.data); // đồng bộ cho filtered
      setPanigate((prev) => ({ ...prev, total: res?.total }));
    }
    setLoading(false);
  };

  // Lọc sản phẩm khi search
  useEffect(() => {
    if (searchDebounce) {
      const newData = products.filter((pro) =>
        pro?.name?.toLowerCase().includes(searchDebounce.toLowerCase())
      );
      setFilteredProducts(newData);
    } else {
      setFilteredProducts(products); // reset khi clear search
    }
  }, [searchDebounce, products]);

  // Gọi API khi type hoặc page thay đổi
  useEffect(() => {
    if (state) {
      fetchProductType(state, panigate.page, panigate.limit);
    }
  }, [state, panigate.page, panigate.limit]);

  // Xử lý phân trang
  const onChange = (current, pageSize) => {
    setPanigate({ ...panigate, page: current - 1, limit: pageSize });
  };

  return (
    <Loading isPending={loading}>
      <div
        style={{
          width: "100%",
          background: "#efefef",
          height: "calc(100vh - 64px)",
        }}
      >
        <div style={{ width: "1270px", margin: "0 auto", height: "100%" }}>
          <Row
            style={{
              flexWrap: "nowrap",
              paddingTop: "10px",
              height: "calc(100% - 20px )",
            }}
          >
            <WrraperNavbar span={4}>
              <NavBarComponent />
            </WrraperNavbar>
            <Col
              span={20}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <WrapperProducts>
                {filteredProducts.map((product) => (
                  <CardComponent key={product._id} {...product} />
                ))}
              </WrapperProducts>
              <Pagination
                defaultCurrent={panigate.page + 1}
                total={panigate?.total}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "10px" }}
              />
            </Col>
          </Row>
        </div>
      </div>
    </Loading>
  );
};

export default TypeProductPage;
