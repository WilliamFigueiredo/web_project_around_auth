class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _handleServerResponse(res) {
    if (res.ok) {
      return res.json().then((data) => {
        return data;
      });
    }
    return Promise.reject(`Erro: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers,
    }).then(this._handleServerResponse);
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers,
    }).then(this._handleServerResponse);
  }

  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handleServerResponse);
  }

  addCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: data.title,
        link: data.image,
      }),
    }).then(this._handleServerResponse);
  }

  updateLike(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this.headers,
    }).then(this._handleServerResponse);
  }

  deleteCard(cardDataId) {
    return fetch(`${this.baseUrl}/cards/${cardDataId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(this._handleServerResponse);
  }

  updateAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._handleServerResponse);
  }
}

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "35449c72-0658-4c76-bd9a-d50bcdab61fb",
    "Content-Type": "application/json",
  },
});

export default api;
