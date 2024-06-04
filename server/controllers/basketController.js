const { where } = require("sequelize");
const { Device, BasketDevice, User } = require("../models/models");

class BasketController {
    async addToBasket(req, res, next) {
        const { deviceId, basketId } = req.body;
        const basket = await BasketDevice.create({ basketId: basketId, deviceId: deviceId });
        return res.json(basket);
    }

    async getBasketUser(req, res) {
        const { id } = req.params;
        const basket = await BasketDevice.findAll({
            where: { basketId: id },
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
