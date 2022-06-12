import React from "react"
import './AdPreview.css';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Actions from "../reflux/actions";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

export const AdPreview = ({ad, canRunActions}) => {

    return (
        <div className="ad-preview">
            <Carousel images={ad?.images}/>
            <div className="ad-footer">
                <div className="ad-texts">
                    <div className="ad-site">WEBSITE.COM</div>
                    <h4>{ad?.headline}</h4>
                    <div className="ad-description">{ad?.description}</div>
                </div>
                <div className="ad-buttons">
                    <button className="ad-cta">{ad?.callToAction}</button>
                    {
                        canRunActions ? 
                            <div className="ad-actions">
                                <Link to={`/update/${ad?.id}`} onClick={()=>{Actions.selectAd(ad)}} className='ad-link'>
                                    <FaEdit className="ad-action-btn" />
                                </Link>
                                <FaTrash onClick={() => {Actions.deleteAd(ad)}} className="ad-action-btn" />
                            </div>
                            :
                            null
                    }
                </div>
            </div>
        </div>
    );
}