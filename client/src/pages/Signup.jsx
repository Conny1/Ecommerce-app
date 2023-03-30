import React, {useState} from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { getData, getError, loadingdata } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

import { mobile,tablet } from '../responsive'


const Container =  styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:15px;
height:100Vh;

`
const Item = styled.div`
display:flex;
flex-direction:column;
gap:10px;
width:40%;
padding:20px;
${tablet({width:'70%'})}
${mobile({width:'90%'})}


`

const Input = styled.input`
height:30px;
background-color:transparent;
border:none;
outline:1px solid #9f9f9f;
`
const H3 = styled.h3`
line-height:0px;
`
const Button = styled.button`
cursor: pointer;
max-width:100px;
border:none;
padding:5px;
background-color:#000;
color:#ffffff;
 
`
const Signup = () => {
 const [name, setname] = useState('')
 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
 const login =async ()=>{
  dispatch(  loadingdata())
  if(!email || !password ) return alert("Fill all given inputs")
try {
const results= await  axios.post(`https://ecommapi-xp5g.onrender.com/api/auth/login`,{email,password})
dispatch( getData(results.data) ) 
// console.log(results.data)    
navigate("/")
} catch (error) {
dispatch( getError() )
alert (error.response.data.message)
 }      
}


 const signUp =async ()=>{
       dispatch(  loadingdata())
       if( !name || !email || !password ) return alert("Fill all given inputs")
  try {
    const results= await  axios.post(`https://ecommapi-xp5g.onrender.com/api/auth/signup`,{name,email,password})
    dispatch( getData(results.data) )     
    navigate("/")
  } catch (error) {
    dispatch( getError() )
    alert (error.response.data.message)
  }
   
}

const google=()=>{
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
     // eslint-disable-next-line 
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    // IdP data available using getAdditionalUserInfo(result)
    // send data to db
    dispatch(loadingdata())
   
    axios.post(`https://ecommapi-xp5g.onrender.com/api/auth/google`,{
      name:user.displayName ,
      email:user.email,
        
    }).then((results)=>{
      // console.log(results.data)
      dispatch( getData(results.data) )
      
    })
      navigate( "/" )
    // ...
  }).catch((error) => {
    // Handle Errors here.
     dispatch( getError() )
    // The AuthCredential type that was used.
     GoogleAuthProvider.credentialFromError(error);
    // ...
  });


}
  return (
   <Container>
    <H3>Log in</H3>
    
    <Item>
      <Input type= "text" onChange={(e)=> setemail(e.target.value) }  placeholder='Email' />
      <Input type= 'password' onChange={(e)=> setpassword(e.target.value) }  placeholder='password' />
      <Button onClick={login} >Login</Button>
    </Item>
    <Button onClick={google}> LogIn/SignUp with Google </Button>
    <H3>Or</H3>
    <H3>SignUp</H3>
    <Item>
    <Input type= 'text' onChange={(e)=> setname(e.target.value) }  placeholder='Name' />
    <Input type= 'text' onChange={(e)=> setemail(e.target.value) }  placeholder='Email' />
  
      <Input type= 'password' onChange={(e)=> setpassword(e.target.value) }  placeholder='password' />
      <Button onClick={signUp} >Signup</Button>
    </Item>

   </Container>
  )
}

export default Signup