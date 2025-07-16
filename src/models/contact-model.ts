import { DataTypes, Model } from "sequelize";
import sequelize from "../db-config/db-connection";


//creating contact model for table creation and data saving

export class Contact extends Model {
    createdAt: any;
    linkPrecedence: string | undefined;
    linkedId: null | undefined;
    id: any;
    email: any;
    phoneNumber: any;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    linkPrecedence: {
      type: DataTypes.ENUM("primary", "secondary"),
      defaultValue: "primary",
    },
    deletedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "Contact",
    timestamps: true,
    paranoid: true,
  }
);
