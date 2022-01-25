import { useEffect, useState } from 'react';
import './App.css';
import Chart from './components/Chart';
import Spinner from './components/Spinner';
import Table from './components/Table';

const URL = 'https://randomuser.me/api/?nat=fr&gender=male&results=1000'

interface PersonAge {
  dob: { age: number }
}




function App() {
  const [ageArray, setAgeArray] = useState<number[][]|null>(null)
  const [oldest10, setOldest10] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [reloadCount, setReloadCount] = useState(0)

  useEffect(() => {
    window.addEventListener("unload", function () {
      let count = localStorage.getItem('counter') || 0
      if (typeof count == 'string') {
        count = +JSON.parse(count)
      }
      count++
      localStorage.setItem('counter', JSON.stringify(count))
    });
    
      const value = localStorage.getItem('counter');
      if (value) {
        JSON.parse(value)
        setReloadCount(+value)
      }
   
  }, [])

  const handleFetchData = async () => {
    setIsPending(true)
    setError(null)
    try {
      const data = await fetch(URL)
      const { results } = await data.json()
      const sort = results.sort((a: PersonAge, b: PersonAge) => { return (b.dob.age) - (a.dob.age) })
      setOldest10(sort.slice(0, 9));
  
      (function () {
        let ageArray: number[][] = [[], [], [], [], [], []]
        results.map((person: PersonAge) => {
          if (person.dob.age >= 20 && person.dob.age <= 29) {
            ageArray[0].push(person.dob.age)
          }
          if (person.dob.age >= 30 && person.dob.age <= 39) {
            ageArray[1].push(person.dob.age)
          }
          if (person.dob.age >= 40 && person.dob.age <= 49) {
            ageArray[2].push(person.dob.age)
          }
          if (person.dob.age >= 50 && person.dob.age <= 59) {
            ageArray[3].push(person.dob.age)
          }
          if (person.dob.age >= 60 && person.dob.age <= 69) {
            ageArray[4].push(person.dob.age)
          }
          if (person.dob.age >= 70 && person.dob.age <= 79) {
            ageArray[5].push(person.dob.age)
          }
          setAgeArray(ageArray)
        })
      })()
  
      setIsPending(false)

    } catch (err:unknown) {
      if (err instanceof Error) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }
   

  

  return (
    <div className="App">
      <div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cupiditate quibusdam, laborum esse aliquid sequi blanditiis eligendi recusandae architecto quo amet nam unde maiores accusantium voluptatibus! Saepe architecto iusto blanditiis reiciendis libero incidunt velit consectetur ab impedit! Architecto a voluptas non doloribus optio iure odio! Dolorem corrupti nam rerum repudiandae.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cupiditate quibusdam, laborum esse aliquid sequi blanditiis eligendi recusandae architecto quo amet nam unde maiores accusantium voluptatibus! Saepe architecto iusto blanditiis reiciendis libero incidunt velit consectetur ab impedit! Architecto a voluptas non doloribus optio iure odio! Dolorem corrupti nam rerum repudiandae.</p>
      </div>
      <div className='placeholder'>
        {!ageArray && !isPending && !error && <h3>Press the button to fetch some data 🖱️</h3>}
        {error && <h3>Something went wrong, try again.</h3>}
        {isPending && <Spinner />}
        <div className='chart'>
          {ageArray && !isPending && <Chart ages={ageArray} />}
        </div>
        <div className='table'>
          {oldest10 && !isPending && <Table oldest10={oldest10} />}
        </div>
      </div>
      <div className='btn-wrapper'>
        <button className='btn' onClick={handleFetchData}>Fetch Data</button>
      </div>
      <div className={`fifth-tick ${reloadCount % 5 == 0 ? 'change-color' : null}`}>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cupiditate quibusdam, laborum esse aliquid sequi blanditiis eligendi recusandae architecto quo amet nam unde maiores accusantium voluptatibus! Saepe architecto iusto blanditiis reiciendis libero incidunt velit consectetur ab impedit! Architecto a voluptas non doloribus optio iure odio! Dolorem corrupti nam rerum repudiandae.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cupiditate quibusdam, laborum esse aliquid sequi blanditiis eligendi recusandae architecto quo amet nam unde maiores accusantium voluptatibus! Saepe architecto iusto blanditiis reiciendis libero incidunt velit consectetur ab impedit! Architecto a voluptas non doloribus optio iure odio! Dolorem corrupti nam rerum repudiandae.</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore cupiditate quibusdam, laborum esse aliquid sequi blanditiis eligendi recusandae architecto quo amet nam unde maiores accusantium voluptatibus! Saepe architecto iusto blanditiis reiciendis libero incidunt velit consectetur ab impedit! Architecto a voluptas non doloribus optio iure odio! Dolorem corrupti nam rerum repudiandae.</p>

      </div>
    </div>
  );
}

export default App;
