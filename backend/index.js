//Alla importer från olika bibliotek och databasSqlite3.
const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')

const app = express() // Skapar en ny Express-applikation.

app.use(cors()) //  Aktiverar CORS för att tillåta förfrågningar från andra domäner.

const db = new sqlite3.Database(path.resolve(__dirname, 'fabrics.sqlite')) // Ansluter till SQLite-databasen

// En GET-rutt för att hämta alla produkter

app.get('/products', (_req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err.message) // Loggar eventuella fel
            res.status(500).send('Database error') // Skickar ett 500-felmeddelande vid databasfel

            return
        }
        res.json(rows) // Skickar alla produkter som JSON-svar
    })
})

//En POST-rutt för att registrera en ny användare
app.post('/register', (req, res) => {
    const { email, password } = req.body // Hämtar email och password från body.
    db.run(
        'INSERT INTO users (email, password) VALUES (?, ?)',
        [email, password],
        function (err) {
            if (err) {
                console.error(err.message)
                res.status(500).json({ message: 'Database error' })
                return
            }
            res.status(200).json({ message: 'User registered successfully' }) // Skickar en lyckad registreringsmeddelande
        }
    )
})

// Serverar statiska filer från dist-mappen

app.use(express.static(path.join(path.resolve(), 'dist')))

// Fångar alla andra GET-förfrågningar och skickar index.html

app.get('*', (_req, res) => {
    res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000 //Port variabeln
app.listen(PORT, () => {
    console.log('redo på http://localhost:3000') // Loggar att servern är redo
})
