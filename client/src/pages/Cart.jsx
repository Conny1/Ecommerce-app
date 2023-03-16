import React,{ useState, useEffect } from 'react'
import styled from 'styled-components'
import Cartcomponents from '../components/Cartcomponents'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { getCart, getErrorincart, loadingcartdata } from '../redux/cartslice'
import StripeCheckout from 'react-stripe-checkout'

const Container =styled.div`

`
const Button = styled.button`
margin-top:30px;
width:70%;
height:50px;
color:#ffff;
background-color:#000;
border:none;
text-transform:uppercase;
max-width:200px;
margin-bottom:20px;
cursor: pointer;

`
const Cart = () => {
  const dispatch = useDispatch()
  const userId = useSelector((state)=>state.user.user)
 const [cart, setcart] = useState([])
 const token = useSelector((state)=>state.user.user)
 const url ='https://ecomm-euvk.onrender.com'

const [total, settotal] = useState(0)
// eslint-disable-next-line
const [toke, settoke] = useState(null)
const KEY =process.env.REACT_APP_STRIPE_KEY

const onToken =(t)=>{
  settoke(t) 
}
  

 const axiosInterceprot= axios.create({
   baseURL:url,
   headers:{
     authorization: `Bearer ${token?.tokens}`
   }
 })

 const calcullateTotal=(price  )=>{
  if( price.length === 0 ) return
  let totalPrice = 0
  for (let i = 0; i < price.length; i++) {
      totalPrice = totalPrice + price[i].newPrice
    
   }
   settotal(totalPrice)
}
 const fetchCart = async()=>{
  dispatch( loadingcartdata() )
    try {
      const result = await axiosInterceprot.get(`${url}/api/user/cart/${userId?._id}`) 
      calcullateTotal( result.data)
       setcart(result.data)
      dispatch( getCart(result.data) )
      return result.data
    } catch (error) {
      
      if(error.response.data.status === 500){
        alert('Your not logged in')
      }else{
        dispatch(getErrorincart())
      }
    }
  }
  


 useEffect(() => {
 
   fetchCart()
    // eslint-disable-next-line 
 }, [userId?._id,dispatch])

console.log()
  return (
    <>
   <Container>
    { cart.length > 0? cart.map((item)=>{
      
      return <Cartcomponents key={item?._id} item={item} userId={userId} fetchCart={fetchCart} axiosInterceprot={axiosInterceprot} url={url} />
    })   
    :<h1>No item in cart</h1>  }
  
      <Container style={{display:'flex', justifyContent:'center'}} >
       Total price:{total}
        <br/>
        
      <Button><StripeCheckout
      
      billingAddress
      shippingAddress
      description={`Your total is ${total}`}
      token={onToken}
      amount={total * 100}
      stripeKey = {KEY}
      /></Button>
      </Container>
    
  </Container>
  
   <Footer type={'black'}  />
   </>
  )
}

export default Cart