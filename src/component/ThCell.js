import classes from './ThCell.module.scss'

const ThCell = ({ headers, handleSorting, sortType }) => {
  return (
    <thead>
      <tr>
        {headers.map(({ text, className }) => (
          <th
            className={`${className} ${classes.th}`}
            key={text}
            onClick={() => handleSorting({ type: sortType, payload: text })}
          >
            {text}
            {sortType === 'ascending' ? (
              <i className="las la-arrow-up" />
            ) : (
              <i className="las la-arrow-down" />
            )}
          </th>
        ))}
      </tr>
    </thead>
  )
}
export default ThCell
