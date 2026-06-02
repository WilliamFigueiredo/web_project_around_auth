import { useState, useEffect } from "react";
import Nav from "./Nav/Nav";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import { Routes, Route, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

// Importações dos Popups REMOVIDAS daqui

import api from "../utils/api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  // Use States
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const navigate = useNavigate();

  // ______________________

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err, "errouu");
      });
  }
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setLoggedIn(true);

        navigate("/");
      })
      .catch((err) => {});
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  // Estados de controle de popup REMOVIDOS daqui

  // Busca usuário
  useEffect(() => {
    api.getUserInfo().then(setCurrentUser).catch(console.error);
  }, []);

  // Busca cards
  useEffect(() => {
    api.getInitialCards().then(setCards).catch(console.error);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  // Atualiza perfil - Assegure-se de que closePopup seja chamado no Main após o sucesso, se necessário, ou passe uma callback. Aqui, simplifiquei assumindo que o Main gerencia o fechamento após chamar a prop.
  const handleUpdateUser = (data) => {
    return api.updateUserInfo(data).then(setCurrentUser).catch(console.error);
    // closePopup() saiu daqui
  };

  // Atualiza avatar
  const handleUpdateAvatar = (data) => {
    return api.updateAvatar(data).then(setCurrentUser).catch(console.error);
    // closePopup() saiu daqui
  };

  // Adiciona card
  const handleAddCard = async (data) => {
    try {
      const newCard = await api.addCard(data);
      setCards((prev) => [newCard, ...prev]);
      // closePopup() saiu daqui
    } catch (err) {
      console.error(err);
    }
  };

  // Curtir/descurtir
  const handleCardLike = async (card) => {
    try {
      const newCard = await api.updateLike(card._id, card.isLiked);
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    } catch (err) {
      console.error(err);
    }
  };

  // Deletar card
  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards((prev) => prev.filter((c) => c._id !== card._id));
      // closePopup() saiu daqui
    } catch (err) {
      console.error(err);
    }
  };

  // Funções openPopup e closePopup REMOVIDAS daqui
  // Objeto de configuração popups REMOVIDO daqui

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <div className="pages">
          <Routes>
            <Route
              path="/signin"
              element={
                <>
                  <Nav page="login" />
                  <Login onLogin={handleLogin} />
                </>
              }
            />{" "}
            <Route
              path="/signup"
              element={
                <>
                  <Nav page="register" />
                  <Register onRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <>
                    <Nav page="home" onSignOut={handleSignOut} />{" "}
                    <Main
                      cards={cards}
                      onCardLike={handleCardLike}
                      onUpdateUser={handleUpdateUser}
                      onUpdateAvatar={handleUpdateAvatar}
                      onAddCard={handleAddCard}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <InfoTooltip
        isSuccess={isSuccess}
        isOpen={isInfoTooltipOpen}
        onClose={() => setIsInfoTooltipOpen(false)}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
