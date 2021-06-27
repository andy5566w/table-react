import classes from './TdCell.module.scss'

const TdCell = ({
  tableData: { items, filtered_items, current_page, per_page },
  handleDelete,
}) => {
  if (typeof filtered_items === 'string')
    return (
      <tbody>
        <tr className={classes.tr}>
          <td className={classes.error}>{filtered_items}</td>
        </tr>
      </tbody>
    )
  const body_data = [],
    body_mobile_data = []
  const arr = filtered_items.length > 0 ? filtered_items : items
  arr.forEach((value, index) => {
    if (
      index > current_page * per_page &&
      index <= (current_page + 1) * per_page
    ) {
      body_data.push(
        <tr key={value._id} className={classes.tr}>
          {Object.entries(value).map(([key, t], index) => {
            if (key === '_id')
              return (
                <td key={t + index} className={classes.td}>
                  <i
                    className="las la-trash"
                    onClick={() => handleDelete({ type: 'delete', id: t })}
                  />
                </td>
              )
            return (
              <td className={classes.td} key={t + index}>
                {t}
              </td>
            )
          })}
        </tr>
      )

      body_mobile_data.push(
        <tr key={value._id} className={classes.tr__mobile}>
          {Object.entries(value).map(([key, t], index) => {
            if (key === '_id')
              return (
                <td key={t + index}>
                  <div className={classes.td_mobile}>
                    <div>handle</div>
                    <div>
                      <i
                        className="las la-trash"
                        onClick={() => handleDelete({ type: 'delete', id: t })}
                      />
                    </div>
                  </div>
                </td>
              )
            return (
              <td key={t + index}>
                <div className={classes.td_mobile}>
                  <div>{key}</div>
                  <div>{t}</div>
                </div>
              </td>
            )
          })}
        </tr>
      )
    }
  })
  return (
    <tbody>
      {body_data}
      {body_mobile_data}
    </tbody>
  )
}
export default TdCell
