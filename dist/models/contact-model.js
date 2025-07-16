"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_1 = require("sequelize");
const db_connection_1 = __importDefault(require("../db-config/db-connection"));
class Contact extends sequelize_1.Model {
}
exports.Contact = Contact;
Contact.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    linkedId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    linkPrecedence: {
        type: sequelize_1.DataTypes.ENUM("primary", "secondary"),
        defaultValue: "primary",
    },
    deletedAt: sequelize_1.DataTypes.DATE,
}, {
    sequelize: db_connection_1.default,
    tableName: "Contact",
    timestamps: true,
    paranoid: true,
});
