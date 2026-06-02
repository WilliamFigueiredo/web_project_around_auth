import { useState, useContext } from "react";

import Header from "../Header/Header";
import Card from "./components/Card/Card";
import ImagePopup from "../ImagePopup/ImagePopup";

// Importações dos Popups movidas para cá
import Popup from "./Popup/Popup";
import NewCard from "./Popup/components/NewCard/NewCard";
import EditProfile from "./Popup/components/EditProfile/EditProfile";
import EditAvatar from "./Popup/components/EditAvatar/EditAvatar";
import RemoveCard from "./Popup/components/RemoveCard/RemoveCard";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function Main({
  cards,
  onCardLike,
  onUpdateUser,
  onUpdateAvatar,
  onAddCard,
  onCardDelete,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [selectedCard, setSelectedCard] = useState(null);

  // Estados dos popups centralizados no Main
  const [popup, setPopup] = useState(null);
  const [popupCard, setPopupCard] = useState(null); // armazena card pra remoção

  // Função para abrir popup centralizada no Main
  function openPopup(type, card) {
    setPopup(type);
    if (type === "removeCard") {
      setPopupCard(card);
    }
  }

  // Função para fechar popup centralizada no Main
  function closePopup() {
    setPopup(null);
    setPopupCard(null);
  }

  // Objeto de configuração dos popups (agora com as funções de handler locais/props)
  const popups = {
    newCard: {
      title: "Novo Card",
      content: <NewCard onAddCard={onAddCard} onClose={closePopup} />,
    },
    editProfile: {
      title: "Editar Perfil",
      content: <EditProfile onUpdateUser={onUpdateUser} onClose={closePopup} />,
    },
    editAvatar: {
      title: "Editar Avatar",
      content: (
        <EditAvatar onUpdateAvatar={onUpdateAvatar} onClose={closePopup} />
      ),
    },
    removeCard: {
      title: "Tem certeza?",
      content: popupCard && (
        <RemoveCard
          card={popupCard}
          onCardDelete={onCardDelete}
          onClose={closePopup}
        />
      ),
    },
  };

  return (
    <main className="main">
      <Header
        username={currentUser.name}
        about={currentUser.about}
        onClickButtonAdd={() => openPopup("newCard")}
        onClickButtonEdit={() => openPopup("editProfile")}
        onClickAvatarImage={() => openPopup("editAvatar")}
        avatarImage={currentUser.avatar}
      />

      <div className="content">
        <ul className="content__wrap">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={setSelectedCard}
              onTrashClick={() => openPopup("removeCard", card)} // passa o tipo e o card correto
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </div>

      {/* Popups de Imagem e Formulários renderizados no Main */}
      <ImagePopup card={selectedCard} onClose={() => setSelectedCard(null)} />

      {popup && popups[popup] && (
        <Popup title={popups[popup].title} onClose={closePopup}>
          {popups[popup].content}
        </Popup>
      )}
    </main>
  );
}

export default Main;
