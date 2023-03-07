import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from  "./pages/Home";
import Cart from  "./pages/Cart";
import Product from  "./pages/Product";
import Products from  "./pages/Products";
import Nav from  "./components/Nav";
import Wish from "./pages/Wish";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Update from "./components/Update";

const Container = styled.div`


`

function App() {
  return (
    <Container>
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/wish" element={<Wish/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" >
      <Route index element={<Admin/>} />
      <Route path="/admin/update/:id" element= {(<Update/>)} />


      </Route>
        
      </Routes>
      </BrowserRouter>
      
       </Container>
  );
}

export default App;
