const Router = require("express");
const router = new Router();
const serviceController = require("../controllers/serviceController");

router.post("/transfer", serviceController.payService);
// router.get("/auth", );

module.exports = router;
