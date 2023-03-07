import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { TfiHeart,TfiMenu, TfiUser } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { clearAll } from '../redux/cartslice';
import { mobile, nav} from '../responsive';

const Container = styled.div`
display:flex;
/* outline:1px solid red; */
justify-content:space-around;
height:100px;
align-items:center;
position:relative;
${nav({display:'none'})}
`
const ResponseContainer = styled.div`
display:flex;
width:60%;

flex-wrap:wrap;
position:absolute;
top:10%;
right:10%;
flex-direction:column;
outline:1px solid #9f9f9f;
padding:30px;
background-color:#f3f3f3;
animation:slide-in-right 1.5s cubic-bezier(.25,.46,.45,.94) both;

  
`
const Logo = styled.div`
font-size:30px;
font-weight:bold;
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;


`
const Logo2 = styled.div`
font-size:30px;
font-weight:bold;
font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
display:none;
${nav({display:'block'})}
margin-top:10px;
margin-left:30px;


`
const Wrapper = styled.div`
display:flex;
align-items:center;
gap:30px;
/* outline:1px solid red; */
${mobile({flexWrap:'wrap'})}


`
const Button = styled.button`
  position:absolute;
  right:0;
  display:none;
  ${nav({display:'block'})}
  margin-top:10px;
  margin-right:30px;
  background-color:#000;
  color:#ffff;
`



const Text = styled.p``
const Nav = () => {
  const userData = useSelector((state)=> state.user.user)
  const cart = useSelector(state=>state.cart.cart)
  const wish = useSelector(state=>state.cart.wish)
  const [navbar, setnavbar] = useState(false)
  // console.log(wish)
  
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(userData)

  const logOut = ()=>{
    dispatch(logout())
    dispatch(clearAll())
    navigate('/signup')
  }
  return (
    <>
    <Button onClick={()=>{setnavbar(!navbar)}} ><TfiMenu/></Button>
     <Logo2>DEPO</Logo2>
   { navbar && <ResponseContainer>
   <Wrapper>
   <Link to= '/'  style={{textDecoration:'none'}} > Home </Link>
   <Link to= '/products' style={{textDecoration:'none'}} > products </Link>
   {userData?.isAdmin && <Link to= '/admin' style={{textDecoration:'none'}} > Admin </Link>}
   </Wrapper>
  
   <Wrapper>
    <Link  to= '/cart'  style={{textDecoration:'none'}} >Cart({cart?.length || 0 })</Link>
    <Link  to= '/wish'  style={{textDecoration:'none', textAlign:'center'}}  >  <TfiHeart/>({wish?.length || 0})</Link>
   
   {userData?._id? <Text style={{cursor:'pointer'}} onClick={logOut} > <TfiUser/>Logout </Text>  : <Link to='/signup' style={{textDecoration:'none'}} > <TfiUser/>   Login</Link>}
    
   </Wrapper>
 
    </ResponseContainer>}

    
    
    <Container>
      
    
   <Wrapper>
   <Link to= '/'  style={{textDecoration:'none'}} > Home </Link>
   <Link to= '/products' style={{textDecoration:'none'}} > products </Link>
   {userData?.isAdmin && <Link to= '/admin' style={{textDecoration:'none'}} > Admin </Link>}
   </Wrapper>
   <Logo>DEPO</Logo>
   <Wrapper>
    <Link  to= '/cart'  style={{textDecoration:'none'}} >Cart({cart?.length || 0 })</Link>
    <Link  to= '/wish'  style={{textDecoration:'none', textAlign:'center'}}  >  <TfiHeart/>({wish?.length || 0})</Link>
   
   {userData?._id? <Text style={{cursor:'pointer'}} onClick={logOut} > <TfiUser/>Logout </Text>  : <Link to='/signup' style={{textDecoration:'none'}} > <TfiUser/>   Login</Link>}
    
   </Wrapper>
 
    </Container>
    </>
  )
}

export default Nav