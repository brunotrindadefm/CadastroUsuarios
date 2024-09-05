import User from "../model/user";
import {updatedUserData} from '../type/updatedUserData'

const getUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const createUser = async (data: {
  name: string;
  lastName: string;
  profession: string;
  age: number ;
}) => {
  try {
    if (!data.name || !data.profession || !data.lastName) {
      throw new Error("Preencha todos os campos");
    }
    const existingUser = await User.findOne({ 
      where: { 
        name: data.name, 
        lastName: data.lastName 
      } 
    });

    if (existingUser) {
      throw new Error("Usuário com este nome e sobrenome já existe");
    }
    await User.create(data);
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const updateUser = async (id: number, updatedUser: updatedUserData) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Usuário não encontrado.");

    await user.update(updatedUser);
    return user;
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

const deleteUser = async (id: number) => {
  try {
    const user = await User.findByPk(id);

    if (!user) throw new Error("Usuário não encontrado.");

    await user.destroy();
  } catch (error) {
    console.error("Erro interno no servidor", error);
    throw error;
  }
};

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};
