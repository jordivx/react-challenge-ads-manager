import Actions from './actions';
import { v4 as uuid } from 'uuid';

var Reflux = require('reflux');

class StatusStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.state = {
            products: [],
            ads: {},
            currentProduct: null,
            currentProductAds: [],
            currentAd: null,
            deletingAd: null,
            deletedAd: false
        };
        this.listenables = Actions;
    }

    onFetchProducts = async () => {
        const prods = await fetch('assets/shop_database.json')
            .then((data)=>data.json())
            .then((data)=>data.products);
        this.setState({products:prods});
    }

    onSelectProduct = (product) => {
        const adsCopy = JSON.parse(JSON.stringify(this.state.ads));
        let currentAds = [];
        if(adsCopy[product.id] && adsCopy[product.id].length) {
            currentAds = adsCopy[product.id];
        }
        this.setState({currentProduct: product, currentProductAds: currentAds});
    }

    onAddProductAd = (productId, ad) => {
        const adWithId = JSON.parse(JSON.stringify(ad));
        adWithId.id = uuid();
        const adsCopy = JSON.parse(JSON.stringify(this.state.ads));
        if(this.state.ads[productId] && this.state.ads[productId].length) {
            adsCopy[productId].push(adWithId);
            this.setState({ads: adsCopy, currentProductAds: adsCopy[productId]});
        } else {
            adsCopy[productId] = [adWithId];
            this.setState({ads: adsCopy, currentProductAds: adsCopy[productId]});
        }
    }

    onUpdateAd = (productId, ad) => {
        const adsCopy = JSON.parse(JSON.stringify(this.state.ads));
        const foundIndex = adsCopy[productId].findIndex(x => x.id === ad.id);
        adsCopy[productId][foundIndex] = ad;
        this.setState({ads: adsCopy, currentProductAds: adsCopy[productId], currentAd: null});
    }

    onSelectAd = (ad) => {
        this.setState({currentAd: ad});
    }

    onDeleteAd = async (ad) => {
        this.setState({deletingAd: ad});
    }

    onConfirmDeleteAd = () => {
        const adsCopy = JSON.parse(JSON.stringify(this.state.ads));
        const productId = this.state.currentProduct.id;
        const deletingAdString = JSON.stringify(this.state.deletingAd);
        adsCopy[productId] = adsCopy[productId].filter((el) => {
            return JSON.stringify(el) !== deletingAdString; 
        }); 

        this.setState({deletingAd: null, ads: adsCopy, currentProductAds:adsCopy[productId], deletedAd: true});
    }

    onCancelDeleteAd = () => {
        this.setState({deletingAd: null});
    }

    onRedirectAfterDelete = () => {
        this.setState({deletedAd: false});
    }
}

export default StatusStore;