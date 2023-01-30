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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        })
        .then(this._handleResponse)
    }

    login(email, password) {
        return fetch(`${this._baseURL}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(this._handleResponse)
    }

    logOut() {
        return fetch(`${this._baseURL}/signout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(this._handleResponse)
    }

    checkToken() {
        return fetch(`${this._baseURL}/users/me`, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
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
}

export const api = new Api({
    baseURL: /*'https://api.movies-searcher.nomoredomains.rocks/'*/ 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})