import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              console.log("element is ...", element);
              console.log("Route found ... ", <Route key={index} {...rest} element={element} />)
              console.log("Rest is.....", rest);
              return <Route key={index} element={element} {...rest} />;
          })}
        </Routes>
      </Layout>
    );
  }
}
