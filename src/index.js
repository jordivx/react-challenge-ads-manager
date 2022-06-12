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
import history from './history';
import { Modal } from './components/Modal';
import Actions from './reflux/actions';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

var Reflux = require('reflux');

class App extends Reflux.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      showDeleteDialog: false
    };
    this.store = StatusStore;
  }

  showModal = e => {
    if(e) {
      Actions.confirmDeleteAd();
    } else {
      if(e === false) {
      Actions.cancelDeleteAd();
    }    }
    this.setState({
      show: !this.state.show
    });
  };
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentProduct === this.state.currentProduct &&
      prevState.currentProductAds !== this.state.currentProductAds &&
      (prevState.currentProductAds.length < this.state.currentProductAds.length ||
      (prevState.currentAd !== null && this.state.currentAd === null))) {
        history.back();
    }
    if (prevState.deletingAd !== this.state.deletingAd && this.state.deletingAd !== null) {
      this.showModal();
    }
    if (prevState.deletedAd !== this.state.deletedAd && this.state.deletedAd === false) {
      NotificationManager.success('The ad has been removed.', 'Ad removed succcessfully');
    }
  }

  render() {
    return (
      <>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<NavigationView />}>
            <Route index element={<IndexView products={this.state.products} />} />
            <Route path="read/:productId" element={<ReadView product={this.state.currentProduct} ads={this.state.currentProductAds} deletedAd={this.state.deletedAd}/>} />
            <Route path="create/:productId" element={<CreateView product={this.state.currentProduct} />} />
            <Route path="update/:adId" element={<UpdateView product={this.state.currentProduct} ad={this.state.currentAd} />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Modal onClose={this.showModal} show={this.state.show} title="Confirm Ad deletion">
          If you delete the ad, the data will be lost, are you sure you want to delete it?
      </Modal>
      <NotificationContainer/>
      </>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);
