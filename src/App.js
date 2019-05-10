import React from 'react';
import Layout from './components/Layout/Layout';

import './App.css';
import PizzaMaker from './containers/PizzaMaker/PizzaMaker';

function App() {
  return (
    <div>
      <Layout>
        <PizzaMaker />
      </Layout>
    </div>
  );
}

export default App;
