import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import { Route, Routes } from 'react-router-dom';
import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";
import Login from './containers/Login/Login'

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/burger-builder' element={<BurgerBuilder />} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/contact-data" element={<ContactData/>}/>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </Layout>
    );
  }
}

export default App;
