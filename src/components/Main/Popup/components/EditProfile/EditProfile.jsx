import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

export default function EditProfile({ onUpdateUser, onClose, isOpen }) {
  const currentUser = useContext(CurrentUserContext);

  // estados locais só pra controlar o que o usuário digita
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Atualiza os campos quando o popup abre, mas **fora do fluxo de render inicial**
  function handleOpen() {
    if (currentUser) {
      setName(currentUser.name || "");
      setDescription(currentUser.about || "");
    }
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about: description });
    onClose();
  }

  // chamamos handleOpen quando o popup abrir
  if (isOpen) handleOpen();

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        id="name"
        name="popup__input_type_name"
        className="popup__input popup__input_type_name"
        type="text"
        minLength="2"
        maxLength="40"
        required
        placeholder="Nome"
        value={name}
        onChange={handleNameChange}
      />
      <span id="popup__error--name" className="popup__error"></span>

      <input
        id="about"
        name="popup__input_type_about"
        className="popup__input popup__input_type_about"
        type="text"
        minLength="2"
        maxLength="200"
        required
        placeholder="Ocupação"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span id="popup__error--about" className="popup__error"></span>

      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
