export default function ImagePopup(props) {
  const { card, onClose } = props;
  if (!card) return null;

  return (
    <div id="popup__bigimage" className="popup popup__big-buttons">
      <div className="popup__container-text-image">
        <button className="popup__closebutton" onClick={onClose}></button>

        <img src={card.link} alt={card.name} className="popup__image" />

        <p className="popup__description">{card.name}</p>
      </div>
    </div>
  );
}
