import { useState, useEffect } from 'react'
import './App.css'
import Hello from './components/Hello'

function App() {
    const [cities, setCities] = useState([])
    useEffect(() => {
        fetch('/cities')
            .then((response) => response.json())
            .then((data) => setCities(data))
    }, [])

    return (
        <div>
            <h1>Städerna och befolkningen</h1>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>
                        {city.name}:{city.population}
                    </li>
                ))}
            </ul>
            <Hello />
        </div>
    )
}

export default App
