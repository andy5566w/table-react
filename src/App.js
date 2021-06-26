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
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/exchange_rates'
      )
      setApiData(data)
    }
    fetchData()
  }, [])
  if (isObjectEmpty(apiData)) {
    return <p>data is empty</p>
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
