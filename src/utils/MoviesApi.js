class MoviesApi {
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

    getMovies() {
        return fetch(`${this._baseURL}`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then(this._handleResponse)
    }
}

export const movieApi = new MoviesApi({
    baseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
})