import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cartcomponents from "../components/Cartcomponents";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  UpdateTotalPrice,
  getCart,
  getErrorincart,
  loadingcartdata,
} from "../redux/cartslice";

const Container = styled.div``;
const Button = styled.button`
  margin-top: 30px;
  width: 70%;
  height: 50px;
  color: #ffff;
  background-color: #000;
  border: none;
  text-transform: uppercase;
  max-width: 200px;
  margin-bottom: 20px;
  cursor: pointer;
`;
const Input = styled.input``;
const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user);
  const TotalPrice = useSelector((state) => state.cart?.totalPrice);
  console.log(TotalPrice);
  const [cart, setcart] = useState([]);
  const token = useSelector((state) => state.user.user);
  const url = "https://ecommapi-xp5g.onrender.com";

  const [total, settotal] = useState(0);
  const [payWithM, setpayWithM] = useState(false);

  const axiosInterceprot = axios.create({
    baseURL: url,
    headers: {
      authorization: `Bearer ${token?.tokens}`,
    },
  });

  const calcullateTotal = (price) => {
    if (price.length === 0) return;
    let totalPrice = 0;
    for (let i = 0; i < price.length; i++) {
      totalPrice = totalPrice + price[i].newPrice;
    }
    dispatch(UpdateTotalPrice({ price: totalPrice, act: "default" }));
    // settotal(totalPrice);
  };
  const fetchCart = async () => {
    dispatch(loadingcartdata());
    try {
      const result = await axiosInterceprot.get(
        `${url}/api/user/cart/${userId?._id}`
      );
      calcullateTotal(result.data);
      setcart(result.data);
      dispatch(getCart(result.data));
      return result.data;
    } catch (error) {
      if (error.response.data.status === 500) {
        alert("Your not logged in");
      } else {
        dispatch(getErrorincart());
      }
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, [userId?._id, dispatch]);

  return (
    <>
      <Container>
        {cart.length > 0 ? (
          cart.map((item) => {
            return (
              <Cartcomponents
                key={item?._id}
                item={item}
                userId={userId}
                fetchCart={fetchCart}
                settotal={settotal}
                total={total}
                axiosInterceprot={axiosInterceprot}
                url={url}
              />
            );
          })
        ) : (
          <h1>No item in cart</h1>
        )}

        <Container
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            position: "relative",
          }}
        >
          <h3>Total price: ksh{TotalPrice}</h3>
          <br />

          <h3>pay with:</h3>
          <Container>
            <Button
              onClick={() => {
                setpayWithM(true);
              }}
            >
              Mpesa
            </Button>
            <Button> card </Button>
          </Container>

          {payWithM && (
            <Container
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                backgroundColor: "#080808",
                top: 0,
                opacity: 0.9,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Input
                style={{
                  height: "25px",
                  color: "black",
                  fontWeight: "bold",
                }}
                type="number"
                name="phnNumber"
                placeholder="Phone NO eg 0728..."
              />
              <Button
                style={{
                  backgroundColor: "#ffff",
                  width: "75px",
                  height: "30px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                pay
              </Button>
              <Button
                style={{
                  position: "absolute",
                  backgroundColor: "#ffff",
                  bottom: 0,
                  color: "black",
                  fontWeight: "bold",
                }}
                onClick={() => setpayWithM(false)}
              >
                cancel
              </Button>
            </Container>
          )}
        </Container>
      </Container>

      <Footer type={"black"} />
    </>
  );
};

export default Cart;
