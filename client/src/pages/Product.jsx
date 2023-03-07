import React,{ useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import Footer from '../components/Footer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { getErrorincart, getWish } from '../redux/cartslice';
import {  tablet } from '../responsive';

const Container = styled.div`
margin:30px;
display:flex;
justify-content:space-evenly;
${tablet({flexDirection:'column', alignItems:'center'})}



`
const Image = styled.div`
width:40%;
max-width:400px;
min-width:200px;
${tablet({width:'70%'})}

`
const Img = styled.img`
width:100%;
height:100%;
`
const Info = styled.div`
/* outline:1px solid red; */
width:40%;
${tablet({width:'90%'})}

`
const  Text = styled.p``
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


const Product = () => {
  const dispatch = useDispatch();
  const [product, setproduct] = useState({})
  const [quantity, setquantity] = useState(1)
  const prodId = useLocation().pathname.split('/')[2]
  const navigate = useNavigate()
  // console.log(userId)
  const userId = useSelector((state)=> state.user?.user?._id)
  const token = useSelector((state)=>state.user?.user)
   const url ='https://ecomm-euvk.onrender.com'
 
   const axiosInterceprot= axios.create({
     baseURL:url,
     headers:{
       authorization: `Bearer ${token?.tokens}`
     }
   })


  useEffect(() => {
    const fetchProduct = async()=>{
      const results = await axios.get(`${url}/api/products/${prodId}`)
      // console.log(results.data)
      setproduct(results.data)
    } 
    fetchProduct()
  },[prodId])

  const increaseQuantyt= async(opt)=>{
    if(opt === 'inc'){
      setquantity((prev)=>prev + 1)
    }else if ( opt === 'decr'){
      if( quantity <= 1){
        return setquantity(1)
      }
      setquantity((prev)=>prev - 1)
    }
  }

  const addtoCart= async()=>{
    try {
       await axiosInterceprot.put(`${url}/api/user/addcart/${userId}/${prodId}`)
      
      alert('Added to cart')
    } catch (error) {
      if (error.response.data.status === 500){
        alert('create an account to perform that action')
        navigate('/signup')
      }else{
        alert(error.response.data.message)
      }
    }
  }

  // refresh wishlist
  const fetchWish = async()=>{
    try {
      const result = await axiosInterceprot.get(`${url}/api/user/wishlist/${userId}`)
      // console.log(result.data)
      dispatch(getWish(result.data))
    } catch (error) {
      dispatch(getErrorincart())
    }
  }

  const addtoWishlist= async()=>{
    try {
       await axiosInterceprot.put(`${url}/api/user/wishlist/${userId}/${prodId}`)
      // console.log(result)
      await fetchWish()
      alert('Added to wishList')

    } catch (error) {
      if (error.response.data.status === 500){
        alert('create an account to perform that action')
        navigate('/signup')
      }else{
        if (error.response.data.status === 500){
          alert('create an account to perform that action')
          navigate('/signup')
        }else{
          alert(error.response.data.message)
        }
      }
    }
  }

  return (
    <>
    <Container>
      <Image>
        <Img src={product?.imgUrl} alt={product?.title} ></Img>
      </Image>

      <Info>
        <Text style={{ fontWeight:'bolder' , fontSize:'20px' }} >{product?.title}</Text>
        <Text>ksh {product?.newPrice}</Text>
        { product?.oldPrice &&  <Text  style={{ textDecoration:'line-through', color:'#9f9f9f' }}  >{product?.oldPrice}</Text>  }
        <Text>{product?.desc}</Text>
        <Info   style={{width:'70%',  display:'flex', maxWidth:'200px', justifyContent:'space-between', alignItems:'center', gap:'10px' ,outline:'1px solid #9f9f9f' }} >
          <Text style={{justifySelf:'flex-start'}} >Quantity</Text>
          <Info style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'10px' }} >
          <MdArrowLeft onClick={()=> increaseQuantyt('decr')} style={{fontSize:'30px' , cursor:'pointer' }} />
         <Text>{quantity}</Text>
         <MdArrowRight onClick={()=> increaseQuantyt('inc')} style={{fontSize:'30px', cursor:'pointer'}}  />
          </Info>
        </Info>
        <Button onClick={addtoCart} >Add to cart</Button>
        <br/>
        <FaHeart onClick={addtoWishlist} />
        <Link to= '/wish' style={{ textDecoration:'none'}}  > <b>Browse wishlist</b> </Link>


      </Info>
    </Container>
    <Footer type={'black'}  />
    </>
  )
}

export default Product