import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onTrashClick, onCardLike }) {
  // Aqui, o isLiked vai ser recalculado toda vez que o card mudar

  function handleClickLike() {
    onCardLike(card); // envia pro App atualizar o state
  }

  return (
    <li className="card">
      <button className="popup__delete-buton" onClick={onTrashClick}></button>

      <img
        src={card.link}
        alt={card.name}
        className="content__images"
        onClick={() => onCardClick(card)}
      />

      <div className="content__container">
        <p className="content__text">{card.name}</p>

        <button
          className={`content__icon ${card.isLiked ? "content__icon-enabled" : ""}`}
          onClick={handleClickLike} // dispara a atualização
        />
      </div>
    </li>
  );
}
