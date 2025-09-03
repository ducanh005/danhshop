import styled from "styled-components";

export const WrapperLeft = styled.div`
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 6px;
`;

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const WrapperStyleHeader = styled.div`
  display: flex;
  align-items: center;
  background: #fafafa;
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  color: #333;

  .col-checkbox {
    width: 390px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .col-price {
    width: 120px;
    text-align: center;
  }
  .col-quantity {
    width: 150px;
    text-align: center;
  }
  .col-total {
    width: 120px;
    text-align: center;
    color: #333;
  }
  .col-action {
    width: 60px;
    text-align: center;
  }
`;

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fff;

  .col-checkbox {
    width: 390px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .col-price {
    width: 120px;
    text-align: center;
  }
  .col-quantity {
    width: 150px;
    display: flex;
    justify-content: center;
  }
  .col-total {
    width: 120px;
    text-align: center;
    color: rgb(255,66,78);
    font-weight: 500;
  }
  .col-action {
    width: 60px;
    text-align: center;
  }

  &:hover {
    background: #fafafa;
  }
`;

export const WrapperListOrder = styled.div`
  display: flex;
  flex-direction: column;
`;



export const WrapperPriceDiscount = styled.div`
  font-size: 12px;
  color: #888;
  text-decoration: line-through;
  margin-left: 20px;
`;

export const WrapperCountOrder = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 96px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px;
  background: #fff;

  button {
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    text-align: center;
    border: none;
    outline: none;
    width: 36px;
  }
`;

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  div {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #333;
  }
`;

export const WrapperTotal = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 17px 20px;
  background: #fff;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;
