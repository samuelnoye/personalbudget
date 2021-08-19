const express = require('express');
const app = express();
const port = 3000;

const envelope = require('./src/routes/envelopes')

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/envelopes', envelope)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})