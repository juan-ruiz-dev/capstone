const carsContainer = document.querySelector('#cars-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4004/api/cars`

const carsCallback = ({ data: cars }) => displayCars(cars)
const errCallback = err => console.log(err)

const getAllCars = () => axios.get(baseURL).then(carsCallback).catch(errCallback)
const createCar = body => axios.post(baseURL, body).then(carsCallback).catch(errCallback)
const deleteCars = id => axios.delete(`${baseURL}/${id}`).then(carsCallback).catch(errCallback)
const updateCar = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(carsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let yrmkmd = document.querySelector('#yrmkmd')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        yrmkmd: yrmkmd.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createCar(bodyObj)

    yrmkmd.value = ''
    price.value = ''
    imageURL.value = ''
}

function createCarCard(car) {
    const carCard = document.createElement('div')
    carCard.classList.add('car-card')

    carCard.innerHTML = `<img alt='car cover image' src=${car.imageURL} class="car-cover-image"/>
    <p class="address">${car.yrmkmd}</p>
    <div class="btns-container">
        <button onclick="updateCar(${car.id}, 'minus')">-</button>
        <p class="car-price">$${car.price}</p>
        <button onclick="updateCar(${car.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCars(${car.id})">delete</button>
    `


    carsContainer.appendChild(carCard)
}

function displayCars(arr) {
    carsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createCarCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllCars()