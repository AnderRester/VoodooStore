const ApiError = require("../error/ApiError");
const Sequelize = require("../db");
const { where } = require("sequelize");
const { Account } = require("../models/models");

class AccountController {
    async createAccount(req, res, next) {
        // const userId = req.params;
        const { userId, unit } = req.body;
        return await Sequelize.transaction(async (transaction) => {
            console.log(userId);
            if (!unit) {
                throw new ApiError.badRequest("Укажите валюту счёта"); // Throw error within transaction
            }

            if (!userId) {
                throw new ApiError.badRequest("Не указан пользователь"); // Throw error within transaction
            }

            // Create user within the transaction
            const account = await Account.create(
                { balance: 0, unit: unit, userId: userId },
                { transaction }
            );

            // Transaction successful, commit changes
            await transaction.commit();

            return res.json({ res: "Ваш счёт успешно создан" });
        }).catch((error) => {
            // Catch errors thrown within the transaction
            console.error(error);
            next(error);
        });
    }

    async getUserAccountInfo(req, res, next) {
        const { userId } = req.body;

        return await Sequelize.transaction(async (transaction) => {
            // Fetch the user (optional, depending on your needs)
            // const user = await User.findByPk(userId, { transaction });
            console.log("UserId: " + userId);
            // Fetch all accounts belonging to the user
            const accounts = await Account.findAll({
                where: { userId },
                transaction,
            });

            // Return the retrieved accounts
            return res.json({ accounts });
        }).catch((error) => {
            // Catch errors thrown within the transaction
            next(error);
        });
    }
}

module.exports = new AccountController();
