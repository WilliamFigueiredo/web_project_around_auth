export default function Popup(props) {
  //children é o conteúdo de popup
  const { title, children, onClose, isOpen } = props;
  if (!isOpen) return null;
  return (
    <div>
      <div id="popup__editprofile" className="popup popup__little-buttons">
        <div className="popup__container">
          <button className="popup__closebutton" onClick={onClose}></button>
          <h2 className="popup__title">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
