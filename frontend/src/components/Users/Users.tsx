import "./Users.scss";

import { FaEdit, FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../interfaces/User";
import { UsersProps } from "../../interfaces/UsersProps";

import Snackbar from "../SnackBar/SnackBar";

const Users = ({ newUser }: UsersProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:2121/api/users");
      setUsers(response.data);
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: "error",
        autoHideDuration: 3500,
      });
    }
  };

  const handleDeleteUser = async (userID: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:2121/api/users/${userID}`
      );
      setUsers(users.filter((user) => user.id !== userID));
      Snackbar({
        message: "Usuário deletado com sucesso",
        variant: "success",
        autoHideDuration: 3500,
      });
    } catch (error: any) {
      Snackbar({
        message: error.response.data,
        variant: "error",
        autoHideDuration: 3500,
      });
    }
  };

  const handleEditUser = async (user: User) => {
    setEditingUser(user);
  };

  const handleSaveUser = async (e: React.FormEvent, updatedUser: User) => {
    e.preventDefault();
    try {
      const userCorrection = {
        ...updatedUser,
        name: correction(updatedUser.name),
        lastName: correction(updatedUser.lastName),
        profession: correction(updatedUser.profession),
        age: Number(updatedUser.age),
      };

      const response = await axios.put(
        `http://localhost:2121/api/users/${userCorrection.id}`,
        userCorrection
      );
      const userIndex = users.findIndex(
        (user) => user.id === userCorrection.id
      );
      if (userIndex !== -1) {
        const newUsers = [...users];
        newUsers[userIndex] = userCorrection;
        setUsers(newUsers);
        setEditingUser(null);
      }
      Snackbar({
        message: "Usuário editado com sucesso",
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

  const correction = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    getUsers();
    console.log("Busqueeei");
  }, [newUser]);

  return (
    <>
      {users.length > 0 && (
        <div className="users">
          <>
            {users.map((user) => (
              <div className="user" key={user.id}>
                <div>
                  <p>Nome</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Sobrenome</p>
                  <span>{user.lastName}</span>
                </div>
                <div>
                  <p>Profissão</p>
                  <span>{user.profession} </span>
                </div>
                <div>
                  <p>Idade</p>
                  <span>{user.age}</span>
                </div>
                <div className="edit-del">
                  <p>
                    <FaEdit onClick={() => handleEditUser(user)} />
                  </p>
                  <p>
                    <MdDeleteForever
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  </p>
                </div>
                {editingUser && editingUser.id === user.id && (
                  <form
                    onSubmit={(e) => handleSaveUser(e, editingUser)}
                    className="editing"
                  >
                    <div>
                      <input
                        type="text"
                        value={editingUser.name}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            name: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editingUser.lastName}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            lastName: e.target.value,
                          })
                        }
                      />
                      <input
                        type="text"
                        value={editingUser.profession}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            profession: e.target.value,
                          })
                        }
                      />
                      <input
                        type="number"
                        value={editingUser.age}
                        onChange={(e) =>
                          setEditingUser({
                            ...editingUser,
                            age: parseInt(e.target.value),
                          })
                        }
                      />
                      <button type="submit">
                        <FaRegSave />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </>
        </div>
      )}
    </>
  );
};

export default Users;
