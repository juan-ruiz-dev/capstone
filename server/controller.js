const cars = require('./db.json')
let globalID = 4

module.exports = {
    getCars: (req, res) => {
        res.status(200).send(cars)
    },
    deleteCars: (req, res) => {
        let index = cars.findIndex(elem => elem.id === +req.params.id)
        cars.splice(index, 1)
        res.status(200).send(cars)
    },
    createCar: (req, res) => {
        const {yrmkmd, price, imageURL} = req.body;
        let newCar = {
            id: globalID,
            yrmkmd,
            price: +price,
            imageURL

        }
        cars.push(newCar)
        globalID++;
        res.status(200).send(cars)
    },
    updateCar: (req, res) => {
        
        const {type} = req.body;
        let index = cars.findIndex(elem => elem.id === +req.params.id)
        if(type === 'minus' && cars[index].price > 10000){
            cars[index].price -=1000;
            res.status(200).send(cars)
        }else if (type === 'plus'){
            cars[index].price +=1000;
            res.status(200).send(cars)
        }else {
            res.status(400).send('Invalid price')
    }
    }
}