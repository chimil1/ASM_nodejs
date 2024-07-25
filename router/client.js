const express = require("express");
router = express();

 const homeController = require('../controller/client/home')


router.get("/",homeController.index);

router.get("/shop",homeController.shop);

router.get("/about",homeController.about);

router.get("/services",homeController.services);

router.get("/blog",homeController.blog);

router.get("/contact",homeController.contact);

router.get("/cart",homeController.cart);

router.get("/single/:id",homeController.single);

module.exports = router;
