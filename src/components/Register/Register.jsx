import { useState } from "react";
import "../../blocks/popup-little-images.css";
import "../../blocks/auth.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }
  return (
    <form noValidate className="form" onSubmit={handleSubmit}>
      <h2 className="popup__title auth__title">Registro</h2>
      <input
        className="popup__input auth__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="popup__input auth__input"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="popup__save auth__submit" type="submit">
        Inscrever-se
      </button>
    </form>
  );
}

export default Register;
