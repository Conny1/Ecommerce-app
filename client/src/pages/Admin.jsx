import React ,{useState,useEffect} from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import List from '../components/List';
import axios from 'axios';

import { useSelector } from 'react-redux';
import { mobile } from '../responsive';




const  Container = styled.div`
min-height:100vh;
display:flex;
/* flex-direction:column; */
gap:20px;
align-items:flex-start;
margin-top:50px;
${mobile({flexDirection:'column'}) }

`
const Search = styled.div`
width:30%;
display:flex;
flex-direction:column;
gap:20px;
padding: 20px;
justify-content:center;
align-items:center;
position:sticky;
top:0;
${mobile({width:'70%',position:'relative', alignSelf:'center'}) }

`
const  Input = styled.input`
flex:1;
border:none;
background-color:transparent;

outline:1px solid #9f9f9f;
width:100%;



`
const Button = styled.button`

width:100px;
border:none;

padding:5px;
cursor: pointer;
`
const  Wrapper = styled.div`

display:flex;
flex-wrap:wrap;
gap:10px;
/* margin-top:50px; */
flex:1;
/* outline:1px solid gold; */
justify-content:center;
/* height:100vh; */

`



const Admin = () => {
  const [pname, setpname] = useState('')
  const [desc, setdesc] = useState('')
  const [nprice, setnprice] = useState(0)
  const [oprice, setoprice] = useState(undefined)
  const [quantity, setquantity] = useState(0)
  const [file, setfile] = useState(undefined)
  const [category, setcategory] = useState('miscalenious')
  const [products, setproducts] = useState([])
  const data = useSelector((state)=>state?.user.user)
  const url = 'https://ecomm-euvk.onrender.com'
    const axiosInterceptor = axios.create({
      baseURL:url, 
      headers:{
        authorization:`Bearer ${ data.tokens}`
      }
    })
    const  fetchProducts=async()=>{
      // console.log(prod)
    
      const results = await axios.get(`${url}/api/products/find/all`)
      // console.log(results.data)
      setproducts(results.data)
    }

    useEffect(() => {
     
      fetchProducts()
     }, [])

  

  const uploadDta = async(item)=>{
    
     await axiosInterceptor.post(`${url}/api/products`, item)
     
    await fetchProducts()
  }

  const AddProduct= async()=>{
    if( !pname || !nprice || !desc || !file || !quantity) return alert('Enter all required details')
    const time = new Date().getTime()
    const filename = time + file.name
   
    

    const storage = getStorage();
    
    const storageRef = ref(storage, filename);

const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const data = {
        title:pname,
        desc,
        oldPrice:oprice,
        newPrice:nprice,
        quantity,
        imgUrl:downloadURL,
        category
  
      }
       uploadDta(data)
    });
  }
);   

  }



  return (
    <Container>
      <Search>
        <Input type='text' onChange={(e)=> setpname(e.target.value )} placeholder='Name of product' />
        <Input type='text' onChange={(e)=> setdesc(e.target.value )} placeholder='description of product' />
        <Input type='number' onChange={(e)=> setnprice(e.target.value )} placeholder='New price'  />
        <Input type='number' onChange={(e)=> setoprice(e.target.value )} placeholder='Old price'  />
       <b> Enter product Category below</b>
        <Input type='text' value={category} onChange={(e)=> setcategory(e.target.value )} placeholder='category of product' />
        <Input type='number'  onChange={(e)=> setquantity(e.target.value )} placeholder='Quantity of product'  />
        <Input type='file' onChange={(e)=> setfile(e.target.files[0] )} />
        <Button onClick={AddProduct} >Add</Button>
      </Search>
      <Wrapper>
    {
      products?.map((item)=>{
        return <List key={item._id} {...item} url={url} fetchProducts={fetchProducts} />
      })
    }
     
      </Wrapper>

    </Container>
  )
}

export default Admin