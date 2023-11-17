let crypto = require('crypto')
let express = require('express');
let cors = require('cors')
let app = express();
const data = require('./mocks.json')
const port = 3001

app.use(cors())

app.get('/pagos', (req, res) => {
    const formatedData = data.data.map((office) => {
        return {
            ...office,
            id: crypto.randomUUID()
        }
    })
    res.send({data: formatedData})
})

app.listen(port, () => {
    console.log('Hi from back')
})