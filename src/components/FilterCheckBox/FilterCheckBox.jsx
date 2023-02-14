import React from 'react'
import './FilterCheckBox.css'

export default function FilterCheckBox({ filteredShortMovies, shortMovies }) {
  return (
    <div className='filterCheckBox__shortfilm'>
        <p className='filterCheckBox__shortfilm-title'>Короткометражки</p>
            <label className="filterCheckBox__switch" htmlFor="checkbox">
                <input
                className='filterCheckBox__switch-input'
                type="checkbox"
                id="checkbox"
                onChange={filteredShortMovies}
                checked={shortMovies}
                />
                <div className="filterCheckBox__slider filterCheckBox__round"></div>
            </label>
    </div>
  )
}
