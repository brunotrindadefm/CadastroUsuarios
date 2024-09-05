import "./index.css";

import Form from "./components/Form/Form";
import Users from "./components/Users/Users";

import { useState } from "react";

import { User } from "./interfaces/User";

function App() {
  const [newUser, setNewUser] = useState<User | undefined>(undefined);

  const handleNewUser = (user: User | undefined) => {
    if (user) {
      setNewUser(user);
    }
  };

  return (
    <div className="app">
      <Form onNewUser={handleNewUser} />
      <Users newUser={newUser} />
    </div>
  );
}

export default App;
