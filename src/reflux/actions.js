var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "fetchProducts",
    "selectProduct",
    "addProductAd",
    "selectAd",
    "updateAd",
    "deleteAd",
    "cancelDeleteAd",
    "confirmDeleteAd",
    "redirectAfterDelete"
]);

export default Actions;