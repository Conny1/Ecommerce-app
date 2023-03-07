import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { MdDelete} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Container = styled.div`
width:35%;
height:350px;
max-width:200px;
min-width:150px;
flex:1;
cursor: pointer;
position:relative;
`
const ImgWrapper = styled.div`
height:170px;
`
const Image = styled.img`
width:100%;
height:100%;

`
const InfoWrapper = styled.div`
display:flex;
justify-content:space-between;
`
const Info = styled.p`
line-height:15px;
/* color:${({theme})=>theme.text}; */
`
const Button = styled.button`
height:20px;
margin:10px;
/* background-color:${({theme})=> theme.bgLighter }; */
/* color:${({theme})=> theme.text }; */
border:none;
/* outline:1px solid ${({theme})=> theme.textSoft }; */
cursor: pointer;

`
const Item = styled.div``
const ButtonWrapper = styled.div`
width:100%;
display:flex;
justify-content:space-between;
align-items:center;
position:absolute;
bottom:0;
`



const List = ({_id, title,oldPrice,imgUrl,quantity,desc, newPrice,url, fetchProducts }) => {
    const [ toUpdtate, setTupdate ] = useState()
    const navigate = useNavigate()
    const data = useSelector((state)=>state.user?.user)
    
  
    const axiosInterceptor = axios.create({
      baseURL:url, 
      headers:{
        authorization:`Bearer ${ data.tokens}`
      }
    })
    useEffect(()=>{
      setTupdate({_id, desc,title,oldPrice, newPrice,url,quantity })
    },[ title,oldPrice, newPrice,url,desc, quantity ,_id])

  
    const deleteProduct=async ()=>{

      await axiosInterceptor.delete(`${url}/api/products/${_id}`)
      await fetchProducts()       
    }
  return (
    
   <Container>
    
    <ImgWrapper>
    <Image src={imgUrl} alt={title} />
    </ImgWrapper>
    <InfoWrapper>
     <Item>
     <Info>{title}  </Info>
      <Info> KSh {newPrice} </Info>
    { oldPrice &&  <Info style={{textDecoration:'line-through' }}  > KSh{oldPrice} </Info>} </Item>
      
    </InfoWrapper>
    <ButtonWrapper>
    <Button  onClick={()=>{
          navigate(`/admin/update/${_id}`, { state:toUpdtate })

    }} >Update</Button>
    <MdDelete onClick={deleteProduct} style={{fontSize:'25px'}} />
    </ButtonWrapper >
   </Container>
  
  )
}

export default List