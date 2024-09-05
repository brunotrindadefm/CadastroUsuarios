import { Request, Response } from "express";
import userService from "../service/userService";
import capitalizeFirstLetter from "../utils/capitalizedFirstLetter";
import { body, validationResult, param } from "express-validator";
import {updatedUserData} from '../type/updatedUserData'

// Validações para a criação de usuário
const validateCreateUser = [
  body("name")
    .notEmpty()
    .withMessage("Nome é obrigatório")
    .isAlpha()
    .withMessage("Nome deve conter apenas letras")
    .custom((value) => !value.includes(" "))
    .withMessage("Nome não deve conter espaços"),
  body("lastName")
    .notEmpty()
    .withMessage("Sobrenome é obrigatório")
    .isAlpha()
    .withMessage("Sobrenome deve conter apenas letras")
    .custom((value) => !value.includes(" "))
    .withMessage("Sobrenome não deve conter espaços"),
  body("profession")
    .notEmpty()
    .withMessage("Profissão é obrigatória"),
  body("age")
    .isInt({ min: 0, max: 111 })
    .withMessage("Idade deve ser um número entre 0 e 111"),
];

const validateUpdateUser = [
  // Validações específicas para atualização, considerando que o ID é passado como parâmetro
  param("id").isInt().withMessage("ID deve ser um número inteiro"),
  body("name")
    .optional()
    .isAlpha()
    .withMessage("Nome deve conter apenas letras")
    .custom((value) => !value.includes(" "))
    .withMessage("Nome não deve conter espaços"),
  body("lastName")
    .optional()
    .isAlpha()
    .withMessage("Sobrenome deve conter apenas letras")
    .custom((value) => !value.includes(" "))
    .withMessage("Sobrenome não deve conter espaços"),
  body("profession")
    .optional(),
  body("age")
    .optional()
    .isInt({ min: 0, max: 111 })
    .withMessage("Idade deve ser um número entre 0 e 111"),
];

const createUser = [
  ...validateCreateUser,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, lastName, profession, age } = req.body;

      const capitalizedFirstName = capitalizeFirstLetter(name);
      const capitalizedLastName = capitalizeFirstLetter(lastName);
      const capitalizedProfession = capitalizeFirstLetter(profession);

      await userService.createUser({
        name: capitalizedFirstName,
        lastName: capitalizedLastName,
        profession: capitalizedProfession,
        age,
      });
      res.status(201).json({ name, lastName, profession, age })
    } catch (error) {
      console.error(error);
      res.status(500).send("Erro interno do servidor");
    }
  },
];

const updateUser = [
  ...validateUpdateUser,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, lastName, profession, age } = req.body;
      const userId = Number(req.params.id);

      const updatedData: updatedUserData = {
        name: name ? capitalizeFirstLetter(name) : undefined,
        lastName: lastName ? capitalizeFirstLetter(lastName) : undefined,
        profession: profession ? capitalizeFirstLetter(profession) : undefined,
        age: age !== undefined ? age : undefined,
    };

      await userService.updateUser(userId, updatedData);
      res.status(200).send("Usuário editado com sucesso!");
    } catch (error: any) {
      console.error(error.message);
      res.status(500).send("Erro interno no servidor.");
    }
  },
];

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    if (users.length === 0)
      return res.status(404).send("Erro. Nenhum usuário cadastrado.");
    res.json(users);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Erro interno no servidor");
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    await userService.deleteUser(userId);
    res.status(200).send("Usuário deletado com sucesso");
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Erro interno no servidor");
  }
};

export default {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
