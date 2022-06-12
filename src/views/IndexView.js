import React, { useEffect } from 'react'
import './IndexView.css';
import { ProductCard } from '../components/ProductCard';
import Actions from '../reflux/actions';

export const IndexView = ({products}) => {

    useEffect(() => {
        Actions.fetchProducts();
    }, [])
    
    return (
        <div className='products-ctn'>
            {
                products.map((product) => {
                    return (<ProductCard key={product.productName} product={product}/>);
                })
            }
        </div>
    )
}