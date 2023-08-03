import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
// import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/BurgerBuilder/Checkout/Checkout";
import { Route, Routes } from 'react-router-dom';
import ContactData from "./containers/BurgerBuilder/Checkout/ContactData/ContactData";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <Layout>
        <Routes>
          <Route path='/' element={<BurgerBuilder />} />
          {/* <Route path="/checkout" element={<Checkout/>}/> */}
          <Route path="/checkout" element={<Checkout/>}>
              <Route path="/checkout/contact-data" element={<ContactData/>}/>
          </Route>
          <Route path="/orders" element={<Orders/>}/>
        </Routes>
      </Layout>
    );
  }
}

export default App;
