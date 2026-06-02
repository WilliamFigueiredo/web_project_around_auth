import Popup from "../Main/Popup/Popup";
import successImage from "../../images/popup-images/successImage.png";
import errorImage from "../../images/popup-images/errorImage.png";
function InfoTooltip({ onClose, isSuccess, isOpen }) {
  return (
    <Popup title="" onClose={onClose} isOpen={isOpen}>
      <img
        className="popup__status-image"
        src={isSuccess ? successImage : errorImage}
        alt={isSuccess ? "Sucesso" : "Erro"}
      />

      <h2 className="popup__title">
        {isSuccess
          ? "Parabéns! Seu registro foi efetuado."
          : "Ops, algo saiu errado! Por favor, tente novamente."}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
