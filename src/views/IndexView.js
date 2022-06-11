import React, { useEffect } from 'react'
import Actions from '../reflux/actions';

export const IndexView = ({products}) => {

    useEffect(() => {
        Actions.fetchProducts();
    }, [])
    
    return (
        <div>IndexView - With {products.length} products</div>
    )
}