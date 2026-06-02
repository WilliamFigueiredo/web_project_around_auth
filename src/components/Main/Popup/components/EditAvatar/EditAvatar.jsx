import { useState, useContext } from "react";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";

// Antes estava: export default function EditProfile
export default function EditAvatar({ onUpdateAvatar, isOpen, onClose }) {
  const currentUser = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");

  const handleOpen = () => {
    if (currentUser) setAvatar(currentUser.avatar || "");
  };

  if (isOpen) handleOpen();

  const handleChange = (e) => setAvatar(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({ avatar });
    onClose();
  };

  if (isOpen) handleOpen();

  return (
    <form
      className="popup__form"
      name="avatar-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__input popup__input_type_avatar"
          id="owner-avatar"
          name="avatar"
          type="url"
          placeholder="URL do avatar"
          required
          value={avatar}
          onChange={handleChange}
        />
        <span id="popup__error--about" className="popup__error"></span>
      </label>

      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
