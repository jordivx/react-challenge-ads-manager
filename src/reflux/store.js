import Actions from './actions';

var Reflux = require('reflux');

class StatusStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.state = {
            products: [],
            ads: {},
        };
        this.listenables = Actions;
    }

    onFetchProducts = async () => {
        const prods = await fetch('assets/shop_database.json')
            .then((data)=>data.json())
            .then((data)=>data.products);
        this.setState({products:prods});
    }

    onAddProductAd = async (productId, ad) => {
        console.log('Adding product ad for product with id:' + productId);
    }

    onUpdateProductAd = async (productId, ad) => {
        console.log('Updating product ad for product with id:' + productId);
    }

    onDeleteProductAd = async (productId, ad) => {
        console.log('Deleting product ad for product with id:' + productId);
    }
}

export default StatusStore;