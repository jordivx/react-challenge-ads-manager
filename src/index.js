import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import StatusStore from './reflux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { IndexView } from './views/IndexView';
import { NavigationView } from './views/NavigationView';
import { ReadView } from './views/ReadView';
import { CreateView } from './views/CreateView';
import { UpdateView } from './views/UpdateView';
var Reflux = require('reflux');

class App extends Reflux.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
        this.store = StatusStore;
    }

    render()
    { 
      return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavigationView />}>
              <Route index element={<IndexView products={this.state.products} />} />
              <Route path="read/:productId" element={<ReadView ads={this.state.ads} />} />
              <Route path="create/:productId" element={<CreateView ads={this.state.ads} />} />
              <Route path="update/:adId" element={<UpdateView ads={this.state.ads} />} />
            </Route>
          </Routes>
        </BrowserRouter>
      );
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
