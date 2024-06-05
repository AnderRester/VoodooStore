const ApiError = require("../error/ApiError");
const Sequelize = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Account } = require("../models/models");
const { where } = require("sequelize");

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: "24h" });
};

class UserController {
    async registration(req, res, next) {
        const { idnp, email, password, phone } = req.body;
        return await Sequelize.transaction(async (transaction) => {
            if (!email || !password) {
                throw new ApiError.badRequest("Некорректный формат email или password"); // Throw error within transaction
            }

            // Check for existing user within the transaction
            const candidate = await User.findOne({ where: { email }, transaction });
            if (candidate) {
                throw new ApiError.badRequest("Пользователь с таким email уже существует"); // Throw error within transaction
            }

            const hashPassword = await bcrypt.hash(password, 5);

            // Create user within the transaction
            const user = await User.create(
                { idnp, email, password: hashPassword, phone, role: "USER" },
                { transaction }
            );

            // Generate JWT after successful user creation
            const token = generateJwt(user.id, user.email, user.role);

            // Transaction successful, commit changes
            await transaction.commit();

            return res.json({ token });
        }).catch((error) => {
            // Catch errors thrown within the transaction
            console.error(error);
            next(error);
        });
    }

    async updateUser(req, res, next) {
        const { userId, email, password, phone } = req.body;

        // Perform user data update within a transaction
        return await Sequelize.transaction(async (transaction) => {
            const user = await User.findByPk(userId, { transaction });
            if (!user) {
                throw new ApiError.notFound("Пользователь не найден"); // Throw error for non-existent user
            }

            // Update specific fields based on provided data
            user.email = email || user.email; // Update email if provided, otherwise keep existing value
            user.phone = phone || user.phone; // Update phone if provided, otherwise keep existing value

            // Update password if provided
            if (password) {
                const hashPassword = await bcrypt.hash(password, 5);
                user.password = hashPassword;
            }

            // Save user changes within the transaction
            await user.save({ transaction });

            // Transaction successful, commit changes
            await transaction.commit();

            return res.json({ message: "Пользовательские данные успешно обновлены" }); // Success message
        }).catch((error) => {
            // Catch errors thrown within the transaction
            next(error);
        });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        // Perform user login within a transaction
        return await Sequelize.transaction(async (transaction) => {
            const user = await User.findOne({ where: { email }, transaction });

            if (!user) {
                throw new ApiError.internal("Пользователь не найден"); // Throw error within transaction for non-existent user
            }

            // Validate password using bcrypt.compare within the transaction
            const isPasswordValid = await bcrypt.compareSync(password, user.password, {
                transaction,
            }); // Use async version for transactions

            if (!isPasswordValid) {
                throw new ApiError.internal("Указан неверный пароль"); // Throw error within transaction for invalid password
            }

            const userId = user.id;
            const token = generateJwt(user.id, user.email, user.role);

            // Transaction successful, commit changes
            await transaction.commit();

            return res.json({ userId, token });
        }).catch((error) => {
            // Catch errors thrown within the transaction
            next(error);
        });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        return res.json({ token });
    }
}

module.exports = new UserController();
