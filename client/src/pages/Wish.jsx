import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Footer from '../components/Footer'
import Wishlist from '../components/Wishlist'
import { getWish } from '../redux/cartslice'



const Container =styled.div``

const Wish = () => {
 const userId = useSelector((state)=>state.user.user)
 const [wish, setwish] = useState([])
 const token = useSelector((state)=>state.user.user)
 const url ='https://ecommapi-xp5g.onrender.com'
 const dispatch = useDispatch();

 const axiosInterceprot= axios.create({
   baseURL:url,
   headers:{
     authorization: `Bearer ${token?.tokens}`
   }
 })

 const fetchWish = async()=>{
  try {
    const result = await axiosInterceprot.get(`${url}/api/user/wishlist/${userId?._id}`)
    
    setwish(result.data)
    dispatch(getWish(result.data))
    
  } catch (error) {
    
  }
}
 
 
  
 useEffect(() => {
 
   fetchWish()
    // eslint-disable-next-line 
 }, [userId?._id])
  return (
    <>
   <Container>
     {wish.length > 0? wish?.map((item)=>{
      return <Wishlist key={item?._id} item={item} axiosInterceprot={axiosInterceprot} url={url} fetchWish={fetchWish} />
     }) :<h1>No item in wish list</h1>}
       
          
  </Container>
  <Footer  type={'black'}  />
  
   
   </>
  )
}

export default Wish