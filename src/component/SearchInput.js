import classes from './SearchInput.module.scss'
import { useEffect, useState } from 'react'

const SearchInput = ({ handleSearch }) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    let timer = setTimeout(() => {
      handleSearch({ type: 'search', name: value })
    }, 500)
    return () => clearTimeout(timer)
  }, [value, handleSearch])
  return (
    <div className={classes.input}>
      <label htmlFor="input">查詢Name: </label>
      <input
        type="text"
        id="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
