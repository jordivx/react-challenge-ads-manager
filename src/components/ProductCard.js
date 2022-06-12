import React from "react"
import './ProductCard.css';
import { Link } from 'react-router-dom';
import Actions from '../reflux/actions';

export const ProductCard = ({product}) => {
    return (
        <div className="product-card">
            <img className="product-image" src={product.productImage} alt={product.productName}/>
            <div className="product-info">
                <div className="product-header">
                    <Link to={`read/${product.id}`} onClick={()=>{Actions.selectProduct(product)}} className='product-link'>
                        <h4>{product.productName}</h4>
                    </Link>
                    <h5>{product.price}€</h5>
                </div>
                <p>{product.productDescription}</p>
            </div>
        </div>
    );
}