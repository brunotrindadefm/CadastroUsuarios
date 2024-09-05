import sequelize from "../db/dbConfig";
import { Model, DataTypes } from "sequelize";

class User extends Model { 
    declare id: number;
    declare name: string;
    declare lastName: string;
    declare profession: string;
    declare age: number;
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING(70),
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

export default User;