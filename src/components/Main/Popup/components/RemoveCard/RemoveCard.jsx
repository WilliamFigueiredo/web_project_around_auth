export default function RemoveCard({ card, onCardDelete, onClose }) {
  function handleSubmit(e) {
    e.preventDefault();
    // chama função do App para deletar o card no servidor
    onCardDelete(card);
    // fecha popup
    onClose();
  }

  return (
    <div id="popup__confirm-delete" className="popup popup__little-buttons">
      <div className="popup__container">
        <h2 className="popup__title">Tem certeza?</h2>
        <form
          id="popup__form_confirm-delete"
          className="popup__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <button type="submit" className="popup__save popup__save--enabled">
            Sim
          </button>
        </form>
      </div>
    </div>
  );
}
