class Api {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL
        this._headers = headers
    }

    _handleResponse(res) {
        if(res.ok) {
            return res.json()
        } else {
            return Promise.reject(`Error: ${res.status}`)
        }
    }

    createUser(name, email, password) {
        return fetch(`${this._baseURL}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ name, email, password }),
        })
        .then(this._handleResponse)
    }

    login(email, password) {
        return fetch(`${this._baseURL}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ email, password }),
        })
        .then(this._handleResponse)
    }

    logOut() {
        return fetch(`${this._baseURL}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    checkToken() {
        return fetch(`${this._baseURL}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }

    updateUser(name, email) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({ name, email })
        })
        .then(this._handleResponse)
    }

    createMovies(data) {
        return fetch(`${this._baseURL}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                trailerLink: data.trailerLink,
                image: 'https://api.nomoreparties.co' + data.image.url,
                thumbnail: 'https://api.nomoreparties.co' + data.image.formats.thumbnail.url,
                movieId: data.id,
                nameRU: data.nameRU,
                nameEN: data.nameEN,
            })
        })
        .then(this._handleResponse)
    }

    getSaveMovies() {
        return fetch(`${this._baseURL}/movies`, {
            credentials: 'include',
            headers: this._headers
        })
        .then(this._handleResponse)
    }

    removeMovie(data) {
        return fetch(`${this._baseURL}/movies/${data}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }
}

export const api = new Api({
    baseURL: 'https://api.movies-searcher.nomoredomains.rocks'/*'http://localhost:3000'*/,
    headers: {
        'Content-Type': 'application/json'
    }
})
