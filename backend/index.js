let express = require('express');
let cors = require('cors')
let app = express();
const data = require('./mocks.json')
const port = 3001

app.use(cors())

app.get('/pagos', (req, res) => {
    res.send(data)
})

app.listen(port, () => {
    console.log('Hi from back')
})