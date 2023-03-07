import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { getCart, getErrorincart, loadingcartdata } from '../redux/cartslice'
import { mobile,tablet } from '../responsive'

const Container = styled.div`
    width:30%;
    background-color:#f3f3f3;
    max-height:600px;
    min-height:350px;
    display:flex;
    flex-direction:column;
    align-self:flex-start;
    /* outline:1px solid red; */
    position:relative;
    max-width:250px;
    min-width:200px;
    ${tablet({width:'40%',maxWidth:'unset'})}
    ${mobile({width:'80%'})}

`
const Image = styled.div`
width:100%;
height:200px;
flex:1;
/* outline:1px solid red; */
`
const Img = styled.img`
width:100%;
height:100%;

`
const Info = styled.div`
background-color:#ffff;
text-align:center;
flex:1;
/* outline:1px solid red; */
height:170px;

`
const Text = styled.p``
const Button = styled.div`
text-transform:uppercase;
align-self:center;
cursor: pointer;
position:absolute;
bottom:0;
/* outline:1px solid red; */
width:100%;
background-color:#f3f3f3;
text-align:center;
`
const Card = ({item}) => {
  const userId = useSelector((state)=> state.user.user?._id)
   const dispatch = useDispatch();
   const token = useSelector((state)=>state.user.user)
   const url ='https://ecomm-euvk.onrender.com'
   const navigate = useNavigate()
 
   const axiosInterceprot= axios.create({
     baseURL:url,
     headers:{
       authorization: `Bearer ${token?.tokens}`
     }
   })
  // fech cart data
  const fetchCart = async()=>{
    dispatch( loadingcartdata() )
      try {
        const result = await axiosInterceprot.get(`${url}/api/user/cart/${userId}`)
        dispatch( getCart(result.data) )
      } catch (error) {
        dispatch(getErrorincart())
      }
    }


  const addtoCart= async(prodId)=>{
    try {
       await axiosInterceprot.put(`${url}/api/user/addcart/${userId}/${prodId}`)
       await fetchCart()
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
 


  return (
    
    <Container  >
        <Link  to={`/product/${item?._id}` }style={{  textDecoration:'none' ,color:'#000' }} >
        <Image>
            <Img src={item?.imgUrl} alt={item?.imgUrl} />
        </Image>
        <Info>
            <Text style={{ marginBottom:0 }} >{item?.title}</Text>
            <Info style={{display:'flex', gap:'10px', marginTop:0, justifyContent:'center' }} >
                 {item?.oldPrice && <Text   style={{ textDecoration:'line-through', color:'#9f9f9f' }}  > Ksh{item?.oldPrice}  </Text>}
                 <Text style={{  color:'#9f9f9f' }} >ksh {item?.newPrice}</Text>
            
              </Info>
        </Info>
       
        </Link>
           <Button onClick={()=>addtoCart(item?._id)} > add to cart</Button>
    </Container>
   
  )
}

export default Card