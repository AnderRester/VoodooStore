const ApiError = require("../error/ApiError");
const Sequelize = require("../db");
const { where } = require("sequelize");
const { Service, Account } = require("../models/models");

class ServiceController {
    async payService(req, res, next) {
        const { fromAccountId, toAccountId, amount } = req.body;
        return await Sequelize.transaction(async (transaction) => {
            // Validate input data (optional)
            if (!fromAccountId || !toAccountId || !amount || amount <= 0) {
                throw new ApiError.badRequest("Invalid transfer data");
            }

            // Fetch the accounts (ensure they exist)
            const fromAccount = await Account.findByPk(fromAccountId, { transaction });
            const toAccount = await Account.findByPk(toAccountId, { transaction });
            if (!fromAccount || !toAccount) {
                throw new ApiError.notFound("Account(s) not found");
            }

            // Check sufficient balance in the source account
            if (fromAccount.balance < amount) {
                throw new ApiError.badRequest("Insufficient funds in source account");
            }

            // Update account balances (ensure sufficient balance before update)
            fromAccount.balance -= Number(amount);
            toAccount.balance += Number(amount);

            // Save account changes within the transaction
            await fromAccount.save({ transaction });
            await toAccount.save({ transaction });

            // Transaction successful, commit changes
            await transaction.commit();

            return res.json({ message: "Перевод успешно выполнен" });
        }).catch((error) => {
            // Catch errors thrown within the transaction
            next(error);
        });
    }
}

module.exports = new ServiceController();
