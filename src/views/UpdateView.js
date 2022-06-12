import React, { useState } from 'react'
import { Navigate } from 'react-router-dom';
import { AdPreview } from '../components/AdPreview';
import Actions from '../reflux/actions';
import './UpdateView.css';
import {NotificationManager} from 'react-notifications';

export const UpdateView = ({product, ad}) => {

  const [headline, setHeadline] = useState(ad?.headline);
  const [description, setDescription] = useState(ad?.description);
  const [callToAction, setCallToAction] = useState(ad?.callToAction);
  const [images, setImages] = useState(ad?.images);

  if(product == null) {
    return <Navigate to='/' />
  }

  const updateAdObject = () => {
    return {
      id: ad?.id,
      images: images ?? [],
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
      Actions.updateAd(product.id, updateAdObject());
    } else {
      NotificationManager.error('All the fields are required, you cannot create any ad without informing them all', 'Missing information');
    }
  }

  return (
    <>
    <h4>Update Ad for {product?.productName}</h4>
    <div className="update-view-ctn">
      <div className="update-form">
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
            Update Ad
          </button>
        </form>
      </div>
      <div className='update-preview'>
        <AdPreview ad={updateAdObject()} canRunActions={false}/>
      </div>
    </div>
    </>
  )
}