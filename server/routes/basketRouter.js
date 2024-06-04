const Router = require("express");
const router = new Router();
const basketController = require("../controllers/basketController");

router.post("/", basketController.addToBasket);
router.get("/:id", basketController.getBasketUser);

module.exports = router;
