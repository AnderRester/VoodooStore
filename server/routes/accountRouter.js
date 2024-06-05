const Router = require("express");
const router = new Router();
const accountController = require("../controllers/accountController");

router.post("/create", accountController.createAccount);
router.get("/getInfo", accountController.getUserAccountInfo);

module.exports = router;
