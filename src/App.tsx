import { useCallback, useState } from 'react'
import './App.css'
import client from './services/client'
import Header from './components/Header/Header'
import Form from './components/Form/From';
import Result from './components/Result/Result';
import { City } from './services/model'

function App() {
  const [ loading, setLoading ] = useState(false);
  const [ city, setCity ] = useState<City>();

  const searchCity = useCallback(
      async(q: string) => {
          try {
            setLoading(true);
            const result = await client.SeachCity(q, 1);
            setCity(result[0]);
          }
          finally {
            setLoading(false);
          }
      },
      []
  )

  return (
    <>
      <Header />
      <Form onSubmit={searchCity} />
      {!!city && <Result city={city} />}
    </>
  )
}

export default App
