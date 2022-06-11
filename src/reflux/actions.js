var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "fetchProducts",
    "addProductAd",
    "updateProductAd",
    "deleteProductAd"
]);

export default Actions;