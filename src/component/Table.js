import ThCell from './ThCell'
import TdCell from './TdCell'
import SearchInput from './SearchInput'
import classes from './Table.module.scss'
import { useReducer } from 'react'

const init = (props) => {
  return { ...props, status: '', sortType: 'descending', filtered_items: [] }
}

const tableReducer = (state, action) => {
  switch (action.type) {
    case 'convertToArray':
      let _item = { ...state.items }
      _item = Object.values(_item[state.title]).map((v) => ({
        ...v,
        _id: Math.random().toString(16).slice(2),
      }))

      return { ...state, items: _item }
    case 'descending':
      return {
        ...state,
        sortType: 'ascending',
        items: state.items.sort((a, b) => {
          if (typeof a[action.payload] === 'string') {
            return a[action.payload].localeCompare(b[action.payload])
          } else return a[action.payload] - b[action.payload]
        }),
        filtered_items: state.filtered_items.sort((a, b) => {
          if (typeof a[action.payload] === 'string')
            return a[action.payload].localeCompare(b[action.payload])
          else return a[action.payload] - b[action.payload]
        }),
      }
    case 'ascending':
      return {
        ...state,
        sortType: 'descending',
        items: state.items.sort((a, b) => {
          if (typeof a[action.payload] === 'string')
            return b[action.payload].localeCompare(a[action.payload])
          else return b[action.payload] - a[action.payload]
        }),
        filtered_items: state.filtered_items.sort((a, b) => {
          if (typeof a[action.payload] === 'string')
            return b[action.payload].localeCompare(a[action.payload])
          else return b[action.payload] - a[action.payload]
        }),
      }
    case 'delete':
      return {
        ...state,
        items: state.items.filter(({ _id }) => _id !== action.id),
        filtered_items: state.filtered_items.filter(
          ({ _id }) => _id !== action.id
        ),
      }
    case 'search':
      let filtered_items = state.items.filter(({ name }) =>
        name.includes(action.name)
      )
      if (!filtered_items.length && action.name)
        filtered_items = `查無${action.name}`
      return {
        ...state,
        filtered_items,
      }
    default:
      return { ...state }
  }
}

const Table = (props) => {
  const [tableData, dispatch] = useReducer(tableReducer, props, init)
  if (!Array.isArray(tableData.items)) dispatch({ type: 'convertToArray' })
  return (
    <section className={classes.container}>
      <div className={classes.title}>
        {tableData.title}
        <SearchInput handleSearch={dispatch} />
      </div>
      <table className={classes.table}>
        <ThCell
          headers={tableData.headers}
          handleSorting={dispatch}
          sortType={tableData.sortType}
        />
        <TdCell
          filtered_items={tableData.filtered_items}
          items={tableData.items}
          title={tableData.title}
          handleDelete={dispatch}
        />
      </table>
    </section>
  )
}
export default Table
