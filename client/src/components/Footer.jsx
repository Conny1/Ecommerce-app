import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
margin-top:100px;
display:flex;
justify-content:${(props)=> props.type ?'space-evenly':'space-between'};
margin-bottom:${(props)=> props.type ?'0':'30px'};
width:${(props)=> props.type ?'100%':'90%'};
flex-wrap:wrap;
background-color:${(props)=> props.type};


`
const Wrapper = styled.div`
width:200px;
/* outline:1px solid red; */
margin-top:10px;


`
const H3 = styled.h3`
text-transform:uppercase;
`
const Text = styled.p`
color:#9f9f9f;
font-size:12px;
cursor: pointer;
text-transform:capitalize;
line-height:10px;
`

const Footer = ({type}) => {
  return (
   <Container type={type} >
    <Wrapper>
        <H3>Customer service</H3>
        <Text>
            Help & Contact Us
        </Text>
        <Text>
            Returns & Refunds
        </Text>
        <Text>
            Online stores
        </Text>
        <Text>
            Terms and conditions
        </Text>
    </Wrapper>

    <Wrapper>
        <H3>Company</H3>
        <Text>
            What we do
        </Text>
        <Text>
            Available services
        </Text>
        <Text>
            latest Post
        </Text>
        <Text>
            FAQs
        </Text>
    </Wrapper>

    <Wrapper>
        <H3>Social media</H3>
        <Text>
            Twitter
        </Text>
        <Text>
            Instagram
        </Text>
        <Text>
            Tumblr
        </Text>
        <Text>
            Pintrest
        </Text>
    </Wrapper>

    <Wrapper>
        <H3>Profile</H3>
        <Text>
            My Account
        </Text>
        <Text>
            checkout
        </Text>
        <Text>
            Order Tracking
        </Text>
        <Text>
            Help & support
        </Text>
    </Wrapper>
   </Container>
  )
}

export default Footer