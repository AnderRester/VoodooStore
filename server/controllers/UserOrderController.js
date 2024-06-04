const { where } = require("sequelize");
const { Device, UserOrder, User } = require("../models/models");

class BasketController {
    async SaveToOrder(req, res, next) {
        const { deviceId, basketId } = req.body;
        // const basket = await BasketDevice.create({ basketId: basketId, deviceId: deviceId });
        return res.json(order);
    }

    async getUserOrder(req, res) {
        const { id } = req.params;
        const order = await UserOrder.findAll({
            where: { deviceId: id },
            include: {
                model: Device,
            },
        });

        return res.json(basket);
    }

    async transactionTest(req, res, next) {
        const t = await sequelize.transaction();

        try {
            const user = await User.create(
                {
                    firstName: "Bart",
                    lastName: "Simpson",
                },
                { transaction: t }
            );

            await t.commit();
        } catch (error) {
            await t.rollback();
        }
    }
}

module.exports = new BasketController();
