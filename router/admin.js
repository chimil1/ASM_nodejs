const express = require("express");
router = express();

const homeController = require('../controller/admin/home');


router.get("/",homeController.home )

//trang quản lí
router.get("/category/qlPersonnel",homeController.qlPersonnel)

router.get("/category/qlProduct",homeController.qlProduct)

//trang add
router.get("/category/addProduct",homeController.addProduct);
router.post("/category/addProduct",homeController.post);


router.get("/category/addPersonnel",homeController.addPersonnel)
router.post("/category/addPersonnel",homeController.postPersonnel)
//delete
router.get('/category/delete/:MaSanPham', homeController.delete);

router.get('/category/deletePersonnel/:MaNhanVien',homeController.deletePersonnel)

//update
router.get('/category/addProduct/:MaSanPham',homeController.editProduct);
router.post('/category/addProduct/:MaSanPham',homeController.updateProduct);

module.exports = router;
