
import styled from 'styled-components'
import Card from '../components/Card'
import { useState, useEffect } from 'react'
import axios from 'axios'


const Wrapper = styled.div``
const Container = styled.div`
display:flex;
flex-wrap:wrap;
gap:30px;
justify-content:center;
`

const Item = styled.div`
display:flex;
gap:10px;
justify-content:center;
align-items:center;
margin-bottom:50px;


`
const Input = styled.input`
width:70%;
padding:5px;
max-width:500px;
font-size:20px;
border:none;
outline:1px solid #9f9f9f;

`
const Products = () => {
  const [products, setproducts] = useState([])
  const [serchitem, setserchitem] = useState('')
  const url = 'https://ecomm-euvk.onrender.com'

  
 useEffect(() => {
  const  fetchProducts=async()=>{
    // console.log(prod)
  
    const results = await axios.get(`${url}/api/products/find/all`)
    // console.log(results.data)
    setproducts(results.data)
  }
  fetchProducts()
 }, [])
 const searchProduct = async(e)=>{
   setserchitem(e.target.value)
  const results = await axios.get(`${url}/api/products/search/find?name=${serchitem}`)
  setproducts(results.data)
 }

 useEffect(()=>{
  const  fetchProducts=async()=>{
    const results = await axios.get(`${url}/api/products/find/all`)
    setproducts(results.data)
  }
  
  if (serchitem ==='' ){
    fetchProducts()
  }
 },[serchitem])
  
  return (
    <Wrapper>
      
       <Item>
       <Input type='search' onChange={searchProduct}  placeholder='search product' />
       </Item>
         

   <Container>
    {
      products.map((item)=>{
        return <Card key={item._id} item={item} />
      })
    }    
   </Container>
   </Wrapper>
  )
}

export default Products