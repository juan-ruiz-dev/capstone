const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const controller = require ('./controller')
const {getCars, deleteCars, createCar, updateCar} = controller

app.get('/api/cars', getCars)
app.delete('/api/cars/:id', deleteCars)
app.post('/api/cars', createCar)
app.put('/api/cars/:id', updateCar)

app.listen(4004, () => console.log('Running on 4004'))