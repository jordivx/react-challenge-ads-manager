import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AdPreview } from '../components/AdPreview';
import Actions from '../reflux/actions';
import './CreateView.css';
import {NotificationManager} from 'react-notifications';

export const CreateView = ({product}) => {

  const [headline, setHeadline] = useState(product?.productName);
  const [description, setDescription] = useState(product?.productDescription);
  const [callToAction, setCallToAction] = useState('Buy it!');
  const [images, setImages] = useState([product?.productImage]);

  if(product == null) {
    return <Navigate to='/' />
  }

  const createAdObject = () => {
    return {
      images: images,
      headline: headline,
      description: description,
      callToAction: callToAction
    };
  }

  const getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    });
  }

  const fileSelectedHandler = async (e) => {
    const imgs = [];
    for(let i = 0; i < e.target.files.length; i++) {
      const file =e.target.files[i];
      let base64 = await getBase64(file)
      imgs.push(base64);
    }
    setImages(imgs);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(headline !== '' && description !== '' && callToAction !== '') {
      Actions.addProductAd(product.id, createAdObject());
    } else {
      NotificationManager.error('All the fields are required, you cannot create any ad without informing them all', 'Missing information');
    }
  }

  return (
    <>
    <h4>Create Ad for {product.productName}</h4>
    <div className="create-view-ctn">
      <div className="create-form">
        <form onSubmit={handleSubmit}>
          <label>
            Headline
            <input 
              type='text'
              value={headline}
              onChange={(e) => {setHeadline(e.target.value)}}/>
          </label>
          <label>
            Description
            <input 
              type='text'
              value={description}
              required
              onChange={(e) => {setDescription(e.target.value)}}/>
          </label>
          <label>
            CTA
            <input 
              type='text'
              value={callToAction}
              onChange={(e) => {setCallToAction(e.target.value)}}/>
          </label>
          <label>
            Images
            <input type="file" multiple onChange={fileSelectedHandler} />
          </label>
          <button onClick={handleSubmit}>
            Create Ad
          </button>
        </form>
      </div>
      <div className='create-preview'>
        <AdPreview ad={createAdObject()} canRunActions={false}/>
      </div>
    </div>
    </>
  )
}