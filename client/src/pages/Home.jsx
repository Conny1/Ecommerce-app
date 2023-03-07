import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import FilterItems from '../components/FilterItems'
import Footer from '../components/Footer'
import { tablet, mobile } from '../responsive'

const data =[
  { 
    heading:'Think different',
    text:'Depo is a unique & captivating online shop with a unique experience',
    imgUrl:'https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide1-img.png',
  },
  { 
    heading:'Premium comfort',
    text:'One click leads you to your desired item',
    imgUrl:'https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide2-img1.png',
  },
  { 
    heading:'Contemporary design',
    text:'A large set of beautiful & fully unique products done to the final touch',
    imgUrl:'https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide3-img.jpg',
  }
]

const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
/* outline:1px solid red; */
min-height:100vh;
gap: 50px;

`
const Wrapper = styled.div`
margin-top:50px;
display:flex;
/* outline:1px solid red; */
max-width:800px;
background-color:#f3f3f3;
padding-bottom:30px;
gap:40px;
justify-content:space-between;
max-height:400px;
min-width:850px;
${tablet({paddingBottom:'40px',  maxHeight:'500px', gap:'10px', minWidth:'unset', maxWidth:'unset', justifyContent:'space-evenly',width:'95%' })}
${mobile({flexDirection:'column-reverse' , maxHeight:'unset',height:'500px',alignItems:'center'  })}
`
const Image = styled.div`
width:35%;
max-height:300px;
/* outline:1px solid red; */
${tablet({ maxHeight:'250px' ,minHeight:'250px'})}

${mobile({width:'70%',maxHeight:'250px'})}

`
const Img = styled.img`
width:100%;
height:100%;

`
const Info = styled.div`
width:50%;
align-self:flex-end;
margin-left:30px;
max-height:100px;
/* outline:1px solid red; */
${tablet({   textAlign:'center'})}
${mobile({  width:'70%', textAlign:'start', alignSelf:'center', maxHeight:'150px' ,minHeight:'150px' })}
`
const H4 = styled.h4`
font-size:30px;
margin-bottom:0;
font-weight:500;
${tablet({  fontSize:'20px'})}

`
const Text = styled.p`
margin-top:0;
${tablet({  fontSize:'15px'})}
`


const Home = () => {
  const [time, settime] = useState(0)
 
//  image rerendering
 useEffect(() => {
   const timer = setInterval(()=>{
        settime((prev)=> prev + 1)
        if ( time >= 2 ){
          settime(0)
        }
      
 },3000)


   return () => {
    
     clearInterval(timer)
  };

  
 }, [time])



  return (
    <Container>
      <Wrapper>
        <Info>
          <H4>{data[time]?.heading}</H4>
          <Text> {data[time]?.text} </Text>
        </Info>
        <Image>
          <Img src={data[time]?.imgUrl}  alt={data[time]?.heading}  />
        </Image>
      </Wrapper>
   
      <FilterItems/>
      <Footer/>

    </Container>
  )
}

export default Home