import classes from './TdCell.module.scss'

const TdCell = ({ items, handleDelete, filtered_items }) => {
  if (typeof filtered_items === 'string')
    return (
      <tbody>
        <tr className={classes.tr}>
          <td className={classes.error}>{filtered_items}</td>
        </tr>
      </tbody>
    )
  const arr = filtered_items.length > 0 ? filtered_items : items
  return (
    <tbody>
      {arr.map((value) => {
        return (
          <tr key={value._id} className={classes.tr}>
            {Object.entries(value).map(([key, t], index) => {
              if (key === '_id')
                return (
                  <th key={t + index} className={classes.td}>
                    <i
                      className="las la-trash"
                      onClick={() => handleDelete({ type: 'delete', id: t })}
                    />
                  </th>
                )
              return (
                <th className={classes.td} key={t + index}>
                  {t}
                </th>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
export default TdCell
