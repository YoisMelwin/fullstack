import { useState, useEffect } from 'react'
import './App.css'

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
        </div>
    )
}


export default App
