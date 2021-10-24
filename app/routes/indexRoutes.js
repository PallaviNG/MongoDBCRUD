const router = require("express").Router();

const indexController = require("../controller/indexController");

router.get("/",indexController.getProductList);
router.post("/save-new-product",indexController.saveNewProduct);
router.put('/update-product',indexController.updateProduct);
// router.delete('/delete-product/:id',indexController.deleteProduct);
router.delete('/delete-product',indexController.deleteProduct);
module.exports = router;