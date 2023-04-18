import database from "ms-commons/data/db";
import { Optional, DataTypes, Model } from 'sequelize';
import { IAccount } from "../interfaces/account-interfaces";
import { AccountStatus } from "../interfaces/account-status";

class Account extends Model<IAccount, Optional<IAccount, "id">> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare password: string;
  declare status: AccountStatus
  declare domain: string;
}

export default Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 100,
    allowNull: false
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize: database,
  modelName: 'account'
});