import "./Form.scss";

import axios from "axios";
import { useState } from "react";
import { FormProps } from "../../interfaces/FormProps";

import { User } from "../../interfaces/User";
import Snackbar from "../SnackBar/SnackBar";

const Form = ({ onNewUser }: FormProps) => {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [profession, setProfession] = useState<string>("");
  const [age, setAge] = useState<number | "">("");

  const sendUsers = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:2121/api/users", {
        name,
        lastName,
        profession,
        age,
      });
      const newUser: User = response.data;
      onNewUser(newUser);
      setName("");
      setLastName("");
      setProfession("");
      setAge("");
      Snackbar({
        message: "Usuário criado com sucesso!",
        variant: "success",
        autoHideDuration: 3500,
      });
    } catch (error: any) {
      let errorMessage =
        "Ocorreu um erro inesperado ao criar o usuário. Por favor, tente novamente mais tarde.";
      if (error.response && error.response.data) {
        const errorData = error.response.data;
        if (errorData.errors) {
          // Erros de validação
          errorMessage = errorData.errors.map((err: any) => err.msg).join(", ");
        } else if (errorData.message) {
          // Outras mensagens de erro
          errorMessage = errorData.message;
        }
      }
      console.log(error.response);
      Snackbar({
        message: errorMessage,
        variant: "error",
        autoHideDuration: 3500,
      });
    }
  };

  return (
    <>
      <div className="container">
        <h2>Cadastro de usuários</h2>
        <form onSubmit={sendUsers} className="form">
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
          <input
            type="text"
            placeholder="Sobrenome"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            required
          />
          <input
            type="text"
            placeholder="Profissão"
            onChange={(e) => setProfession(e.target.value)}
            value={profession}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            onChange={(e) => setAge(parseInt(e.target.value))}
            value={age}
            required
          />
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </>
  );
};

export default Form;
