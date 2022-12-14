const express = require('express')

const app = express()
const port = 3033


app.set('view engine', 'pug')
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})