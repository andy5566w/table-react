import Table from './component/Table'
import axios from 'axios'
import { useEffect, useState } from 'react'
const headers = [
  { text: 'name', className: '' },
  { text: 'unit', className: '' },
  { text: 'value', className: '' },
  { text: 'type', className: '' },
  { text: 'handle', className: '' },
]
const title = 'rates'
function App() {
  const [apiData, setApiData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          'https://api.coingecko.com/api/v3/exchange_rates'
        )
        setApiData(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="App">
        <i className="las la-sync-alt loading" />
      </div>
    )
  }
  if (isObjectEmpty(apiData) || error) {
    return (
      <div className="App">
        <p>查無此資料或api有誤，error message: {error}</p>
      </div>
    )
  }

  return (
    <div className="App">
      <Table headers={headers} items={apiData} title={title} />
    </div>
  )
}

export default App
function isObjectEmpty(target) {
  return (
    !!target &&
    (target.constructor
      ? target.constructor === Object && Object.keys(target).length === 0
      : Object.keys(target).length === 0)
  )
}
