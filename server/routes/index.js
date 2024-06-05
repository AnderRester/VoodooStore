const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const serviceRouter = require("./serviceRouter");

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/service", serviceRouter);

module.exports = router;
