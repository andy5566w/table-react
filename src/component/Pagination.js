import classes from './Pagination.module.scss'
import { useState, useEffect } from 'react'

const Pagination = ({
  handlePage,
  tableData: { current_page, total_page },
}) => {
  const [perPage, setPerPage] = useState(10)
  useEffect(() => {
    handlePage({ type: 'change_per_page', payload: perPage })
  }, [perPage, handlePage])
  return (
    <div className={classes.pagination}>
      <span className={classes.text}>每頁顯示</span>
      <select
        className={classes.select}
        value={perPage}
        onChange={(e) => setPerPage(e.target.value)}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      <span className={classes.text}>
        {current_page + 1} of {total_page}
      </span>
      <button
        className={classes.btn}
        disabled={current_page === 0}
        onClick={() => handlePage({ type: 'previous' })}
      >
        <i className="las la-angle-left" />
      </button>

      <button
        className={classes.btn}
        disabled={total_page < current_page + 2}
        onClick={() => handlePage({ type: 'next' })}
      >
        <i className="las la-angle-right" />
      </button>
    </div>
  )
}

export default Pagination
