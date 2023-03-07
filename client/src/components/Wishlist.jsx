import React from 'react'
import styled from 'styled-components'
import { BsXLg } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { getCart, getErrorincart, loadingcartdata } from '../redux/cartslice';


const Container = styled.div`
margin:30px;
display:flex;
gap:30px;
position:relative;

`
const Image = styled.div`
width:20%;
max-width:400px;
min-width:150px;

`
const Img = styled.img`
width:100%;
height:100%;
`
const Info = styled.div`
/* outline:1px solid red; */
width:100%;
display:flex;
align-items:center;
justify-content:space-evenly;
flex-wrap:wrap;

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
const  Text = styled.p``


const Wishlist = ({item,axiosInterceprot,url,fetchWish}) => {
  const userId = useSelector((state)=>state.user.user)
  const dispatch = useDispatch();
 // fech cart data
 const fetchCart = async()=>{
  dispatch( loadingcartdata() )
    try {
      const result = await axiosInterceprot.get(`${url}/api/user/cart/${userId._id}`)
      dispatch( getCart(result.data) )
    } catch (error) {
      dispatch(getErrorincart())
    }
  }
  
  
   const addtoCart= async(prodId)=>{
     try {
        await axiosInterceprot.put(`${url}/api/user/addcart/${userId._id}/${prodId}`)
        await fetchCart()
       alert('Added to cart')
     } catch (error) {
       alert(error.response.data.message)
     }
   }
   const  deletewish = async ()=>{
    
    await axiosInterceprot.put(`${url}/api/user/removewishlist/${userId?._id}/${item._id}`)
    await fetchWish()
  }
  
    return (
      
      <Container  >
        <BsXLg onClick={deletewish} style={{position:'absolute', right:0}}  />
        <Image>
          <Img src={item?.imgUrl} alt={item?.title} ></Img>
        </Image>
  
        <Info>
          <Text style={{ fontWeight:'bolder' , fontSize:'12px', textTransform:'uppercase' }} >{item?.title}</Text>
          
          
          <Text>KSh {item?.newPrice}</Text>
          <Button onClick={()=>{addtoCart(item?._id)}} >Add to cart</Button>
          
  
        </Info>
      </Container>
     
      
    )
  }
  
  


export default Wishlist