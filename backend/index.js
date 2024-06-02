const express = require('express')
const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const dbPath = path.resolve(__dirname, 'fabrics.sqlite')
console.log(`Using database at ${dbPath}`)
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message)
    } else {
        console.log('Connected to the database.')
        db.run(
            `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        `,
            (err) => {
                if (err) {
                    console.error('Failed to create users table:', err.message)
                } else {
                    console.log('Users table ready.')
                }
            }
        )
    }
})

// En GET-rutt för att hämta alla produkter
app.get('/products', (_req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

// En POST-rutt för att registrera en ny användare
app.post('/register', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        console.error('Email and password are required')
        return res
            .status(400)
            .json({ message: 'Email and password are required' })
    }

    console.log(`Registering user with email: ${email}`)
    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
            if (err) {
                console.error('Error checking existing user:', err.message)
                return res.status(500).json({ message: 'Database error' })
            }
            if (user) {
                console.error('User already exists:', email)
                return res.status(400).json({ message: 'User already exists' })
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 10)
                db.run(
                    'INSERT INTO users (email, password) VALUES (?, ?)',
                    [email, hashedPassword],
                    function (err) {
                        if (err) {
                            console.error('Error inserting user:', err.message)
                            return res
                                .status(500)
                                .json({ message: 'Database error' })
                        }
                        console.log(
                            `User registered successfully with email: ${email}`
                        )

                        // Kontrollera direkt efter infogning
                        db.all('SELECT * FROM users', (err, rows) => {
                            if (err) {
                                console.error(
                                    'Error fetching users after insert:',
                                    err.message
                                )
                            } else {
                                console.log(
                                    'Current users in the database:',
                                    rows
                                )
                            }
                        })

                        return res
                            .status(200)
                            .json({ message: 'User registered successfully' })
                    }
                )
            } catch (error) {
                console.error('Error hashing password:', error.message)
                return res
                    .status(500)
                    .json({ message: 'Error registering user' })
            }
        }
    )
})

// En POST-rutt för att logga in en användare
app.post('/login', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        console.error('Email and password are required')
        return res
            .status(400)
            .json({ message: 'Email and password are required' })
    }

    console.log(`Logging in user with email: ${email}`)
    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        async (err, user) => {
            if (err) {
                console.error('Error fetching user:', err.message)
                res.status(500).json({ message: 'Database error' })
                return
            }
            if (!user) {
                console.error('Invalid email or password for email:', email)
                return res
                    .status(400)
                    .json({ message: 'Invalid email or password' })
            }
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                console.log(`User logged in successfully with email: ${email}`)
                res.status(200).json({ message: 'Login successful' })
            } else {
                console.error('Invalid email or password for email:', email)
                res.status(400).json({ message: 'Invalid email or password' })
            }
        }
    )
})

// En GET-rutt för att hämta alla användare (endast för utveckling och testning)
app.get('/users', (req, res) => {
    db.all('SELECT id, email, password FROM users', (err, rows) => {
        if (err) {
            console.error('Error fetching users:', err.message)
            res.status(500).send('Database error')
            return
        }
        res.json(rows)
    })
})

// Serverar statiska filer från dist-mappen
app.use(express.static(path.join(path.resolve(), 'dist')))

// Fångar alla andra GET-förfrågningar och skickar index.html
app.get('*', (_req, res) => {
    res.sendFile(path.join(path.resolve(), 'dist', 'index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`)
})
