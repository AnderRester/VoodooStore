const sequelize = require("../db");
const DataTypes = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    idnp: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, unique: true },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Account = sequelize.define("account", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    balance: { type: DataTypes.DECIMAL, defaultValue: "1000.5" },
    unit: { type: DataTypes.STRING, defaultValue: "MDL" },
});

const Service = sequelize.define("service", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
});

const Receipt = sequelize.define("receipt", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    bill: { type: DataTypes.DECIMAL, allowNull: false },
    unit: { type: DataTypes.STRING, defaultValue: "MDL" },
});

User.hasMany(Account);
Account.belongsTo(User);

Service.hasMany(Receipt);
Receipt.belongsTo(Service);

Receipt.belongsTo(Account, { as: "sender", foreignKey: Account.id });
Receipt.belongsTo(Account, { as: "recipient", foreignKey: Account.id });

Account.hasMany(Receipt, { as: "sentReceipts", foreignKey: Account.id });
Account.hasMany(Receipt, { as: "receivedReceipts", foreignKey: Account.id });

module.exports = {
    User,
    Account,
    Service,
    Receipt,
};
