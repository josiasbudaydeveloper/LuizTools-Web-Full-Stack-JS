import database from "ms-commons/data/db";
import { Optional, DataTypes, Model } from 'sequelize';
import { IContact } from "../interfaces/contact-interfaces";
import { ContactStatus } from "../interfaces/contact-status";

class Contact extends Model<IContact, Optional<IContact, "id">> {
  declare id: number;
  declare accountId: number;
  declare name: string;
  declare email: string;
  declare phone: string;
  declare status: ContactStatus;
}

export default Contact.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(21),
    allowNull: true
  },
  status: {
    type: DataTypes.SMALLINT,
    defaultValue: 100,
    allowNull: false
  }
}, {
  sequelize: database,
  modelName: 'contact',
  indexes: [{
    unique: true,
    fields: ['accountId', 'email']
  }]
});