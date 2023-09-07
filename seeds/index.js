const mongoose = require('mongoose')
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')
const descriptions = require('./descriptions')
const CampGround = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/campSite')
.then(data => {
    console.log("Connected to Database!!")
})
.catch(err => {
    console.log("Errors!!")
    console.log(err)
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async function() {
    await CampGround.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 25) + 10
        const c = new CampGround({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: `${sample(descriptions)}`,
            price: price
        })
        await c.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})