import React from 'react'
import { AdPreview } from '../components/AdPreview';
import './ReadView.css';
import { Link, Navigate } from 'react-router-dom';
import Actions from '../reflux/actions';

export const ReadView = ({product, ads, deletedAd}) => {
  
  if(product == null) {
    return <Navigate to='/' />
  }
  if(deletedAd === true) {
    Actions.redirectAfterDelete();
    return <Navigate to='/' />
  }
  return (
    <div>
      <div className='read-view-header'>
        <h3>Ads for {product.productName}</h3> 
        {
          ads.length > 0 && <Link to={`/create/${product.id}`} className='home-link'>
          <button className='add-ad-button'>Add ad</button>
        </Link>
        }
      </div>
      <div className='product-ads-ctn'>
        {
          ads.map((ad, index) => {
            return (<AdPreview key={ad.headline + '_' + index} ad={ad}  canRunActions={true} />);
          })
        }
      </div>
      {
        ads.length === 0 &&
        <div className='no-ads-message'>
          <p>This product does not have any ad yet, create your first one.</p>
          <Link to={`/create/${product.id}`} className='home-link'>
            <button className='add-ad-button'>Add ad</button>
          </Link>
        </div>
      }
    </div>
  )
}