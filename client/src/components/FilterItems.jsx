import axios from 'axios'
import React ,{useState, useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components'
import { getCart, getErrorincart, getWish, loadingcartdata} from '../redux/cartslice'
import Card from './Card'
const Container = styled.div`
width:90%;
/* outline:1px solid red; */
margin-top:50px;

`
const Text = styled.p`
cursor: pointer;
font-weight:500;
`
const Item = styled.div`
display:flex;
flex-wrap:wrap;
gap: 30px;
justify-content:center;

`
const FilterItems = () => {
  const url ='https://ecomm-euvk.onrender.com'
  const [products, setproducts] = useState([])
  const [category, setcategory] = useState(undefined)
  const userId = useSelector((state)=> state.user.user?._id)


  const token = useSelector((state)=>state.user.user)
  const  dispatch = useDispatch(); 

  const axiosInterceprot= axios.create({
    baseURL:url,
    headers:{
      authorization: `Bearer ${token?.tokens}`
    }
  })

  // get cart items
const fetchCart = async()=>{
  dispatch( loadingcartdata() )
    try {
      const result = await axiosInterceprot.get(`${url}/api/user/cart/${userId}`)
      dispatch( getCart(result.data) )
    } catch (error) {
      dispatch(getErrorincart())
    }
  }
  // get wishlist
  const fetchWish = async()=>{
    try {
      const result = await axiosInterceprot.get(`${url}/api/user/wishlist/${userId}`)
      // console.log(result.data)
      dispatch(getWish(result.data))
    } catch (error) {
      dispatch(getErrorincart())
    }
  }
  
 
useEffect(() => {
 const fetchCategory=async ()=>{ 
  
    const cate =await axios.get(`${url}/api/products/find/all`)
    const data = new Set()
    for (let i = 0; i < cate.data.length; i++) {
      data.add( cate.data[i].category )
      
    }
    setcategory( Array.from(data) ) 
    await fetchCart()
    await fetchWish()
    const results = await axios.get(`${url}/api/products/category/funiture`)
  setproducts(results.data)
   
 }
 fetchCategory()
  // eslint-disable-next-line 
},[])

const  fetchProducts=async(prod)=>{
  // console.log(prod)

  const results = await axios.get(`${url}/api/products/category/${prod}`)
  // console.log(results.data)
 
  setproducts(results.data)
}
  return (
   <Container>
    <Item>
      { category?
      category?.map((item, index)=>{
        return <Text onClick={()=>fetchProducts(item)}  key={index} >{ item }</Text>
      })
        : 'Loading...'
      }
       
        
    </Item>
    <Item>
        {products.length >0?
          products?.map((item)=>{
            return <Card key={item._id} item={item}/>
          })
           : 'Loading...'}
       

    </Item>
   </Container>
  )
}

export default FilterItems