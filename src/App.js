import React from 'react';
import Layout from './hoc/Layout/Layout';

import './App.css';
import Auxiliary from './hoc/Auxiliary/Auxiliary';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

function App() {
  return (
    <Auxiliary>
      <Layout>
        <PizzaMaker />
      </Layout>
    </Auxiliary>
  );
}

export default App;
