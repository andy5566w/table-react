import ThCell from './ThCell'
import TdCell from './TdCell'
import SearchInput from './SearchInput'
import Pagination from './Pagination'
import classes from './Table.module.scss'
import { useReducer } from 'react'
const init = (props) => {
  return {
    ...props,
    status: '',
    sortType: 'descending',
    filtered_items: [],
    current_page: 0,
    per_page: 10,
    total_page: 0,
  }
}

const tableReducer = (state, action) => {
  switch (action.type) {
    case 'convertToArray':
      let _item = { ...state.items }
      _item = Object.values(_item[state.title]).map((v) => ({
        ...v,
        _id: Math.random().toString(16).slice(2),
      }))

      return {
        ...state,
        items: _item,
        total_page: Math.ceil(_item.length / state.per_page),
      }
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
    case 'next':
      return { ...state, current_page: state.current_page + 1 }
    case 'previous':
      return { ...state, current_page: state.current_page - 1 }
    case 'change_per_page':
      return {
        ...state,
        per_page: action.payload,
        total_page: Math.floor(state.items.length / action.payload),
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
        <TdCell tableData={tableData} handleDelete={dispatch} />
      </table>
      <Pagination tableData={tableData} handlePage={dispatch} />
    </section>
  )
}
export default Table
