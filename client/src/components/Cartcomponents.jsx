import React, { useState } from "react";
import styled from "styled-components";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import { BsXLg } from "react-icons/bs";
import { mobile, tablet } from "../responsive";
import { useDispatch } from "react-redux";
import { UpdateTotalPrice } from "../redux/cartslice";

const Container = styled.div`
  margin: 30px;
  display: flex;
  gap: 30px;
  position: relative;
`;
const Image = styled.div`
  width: 20%;
  max-width: 400px;
  min-width: 150px;
  ${tablet({ width: "auto", maxWidth: "unset", minWidth: "unset" })}
  ${mobile({ width: "270px", height: "150px" })}
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
`;
const Info = styled.div`
  /* outline:1px solid red; */
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 5px;
`;
const Text = styled.p``;

const Cartcomponents = ({ item, userId, fetchCart, axiosInterceprot, url }) => {
  const [incrq, setincrq] = useState(1);
  const dispatch = useDispatch();

  const increaseQuantity = async (action) => {
    if (action === "inc") {
      setincrq((prev) => prev + 1);
      dispatch(UpdateTotalPrice({ price: item?.newPrice * incrq, act: "inc" }));
    }
    if (action === "dec") {
      setincrq((prev) => prev - 1);
      if (incrq <= 1) {
        return setincrq(1);
      }

      dispatch(
        UpdateTotalPrice({ price: item?.newPrice * (incrq - 1), act: "dec" })
      );
      console.log(incrq);
    }
  };

  const deletecart = async () => {
    await axiosInterceprot.put(
      `${url}/api/user/removecart/${userId?._id}/${item._id}`
    );
    await fetchCart(incrq);
  };

  return (
    <Container>
      <BsXLg onClick={deletecart} style={{ position: "absolute", right: 0 }} />
      <Image>
        <Img src={item?.imgUrl} alt={item?.title}></Img>
      </Image>

      <Info>
        <Text style={{ fontWeight: "bolder", fontSize: "12px" }}>
          {item?.title}
        </Text>

        <Info
          style={{
            width: "100px",
            display: "flex",
            maxWidth: "200px",
            justifyContent: "center",
            alignItems: "center",
            outline: "1px solid #9f9f9f",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ marginBottom: "0px" }}>Quantity</Text>
          <Info
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <MdArrowLeft
              onClick={() => increaseQuantity("dec")}
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
            <Text>{incrq}</Text>
            <MdArrowRight
              onClick={() => increaseQuantity("inc")}
              style={{ fontSize: "30px", cursor: "pointer" }}
            />
          </Info>
        </Info>
        <Text style={{ marginTop: "0px" }}>KSh {item?.newPrice * incrq}</Text>
      </Info>
    </Container>
  );
};

export default Cartcomponents;
