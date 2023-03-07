import axios from 'axios'
import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Wrapper = styled.div`
display:flex;
justify-content:center;
height:100vh;

`

const Container = styled.div`
width:70%;
max-width:500px;
padding:30px;
height:300px;
/* outline:1px solid red; */
gap:30px;
display:flex;
flex-direction:column;
${mobile({width:'95%'})}
`
const  Input = styled.input`
flex:1;
border:none;
background-color:transparent;
/* color:${({theme})=>theme.text}; */
outline:1px solid #9f9f9f;
width:100%;


`
const Button = styled.button`

width:100px;
border:none;
background-color:#000;
color:#ffff;
text-transform:uppercase;
padding:5px;
cursor: pointer;
`

const Update = () => {
  const location = useLocation()?.state
  
  
  const [title, setpname] = useState(location.title)
  const [desc, setdesc] = useState(location.desc)
  const [newPrice, setnprice] = useState(location.newPrice)
  const [oldPrice, setoprice] = useState(location.oldPrice)
  const [quantity, setquantity] = useState(location.quantity)
  const userId = useSelector((state)=>state.user.user?.tokens)
  
  const navigate = useNavigate()
  const axiosIntercetor = axios.create({
    baseURL:location.url,
    headers:{
      Authorization:`Bearer ${userId}`
    }
  })

  const updateProduct = async()=>{
     await axiosIntercetor.put(`${location.url}/api/products/${location._id}`,{title,desc,oldPrice,newPrice,quantity})
      navigate('/admin')
  } 
  return (
    <Wrapper>
    <Container>
    <Input type='text' value={title} onChange={(e)=>setpname(e.target.value)} placeholder='Name of product' />
    <Input type='text'  value={desc}  onChange={(e)=>setdesc(e.target.value)}  placeholder='description of product' />
    <Input type='number'  value={newPrice}  onChange={(e)=>setnprice(e.target.value)}  placeholder='New price'  />
    <Input type='number'  value={oldPrice}  onChange={(e)=>setoprice(e.target.value)}   placeholder='Old price'  />
    <Input type='number'  value={quantity}  onChange={(e)=>setquantity(e.target.value)}  placeholder='Quantity of product'  />
    <Button onClick={updateProduct}  >Update</Button>
  </Container>
  </Wrapper>
  )
}

export default Update