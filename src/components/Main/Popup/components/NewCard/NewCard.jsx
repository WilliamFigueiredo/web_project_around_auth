import { useState } from "react";

export default function NewCard({ onAddCard, onClose }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // chama função do App
    onAddCard({ title, image });
    // fecha popup automático
    onClose();
    // limpa form
    setTitle("");
    setImage("");
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit}>
      <input
        id="title"
        className="popup__input popup__input_type_title"
        type="text"
        placeholder="Título"
        minLength="2"
        maxLength="30"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <span id="popup__error--title" className="popup__error"></span>

      <input
        id="image"
        className="popup__input popup__input_type_image"
        type="url"
        placeholder="Link da imagem"
        required
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <span id="popup__error--image" className="popup__error"></span>

      <button type="submit" className="popup__save">
        Salvar
      </button>
    </form>
  );
}
