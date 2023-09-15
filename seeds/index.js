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

const image1 = [
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560478/CampSite/f3szg2zivaumuhcv7jcm.jpg',
    filename: 'CampSite/f3szg2zivaumuhcv7jcm'
  },
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560478/CampSite/jduz0apsi7nlx31wgvh6.jpg',
    filename: 'CampSite/jduz0apsi7nlx31wgvh6'
  },
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560479/CampSite/qa7bvhexetcawa34ddhr.jpg',
    filename: 'CampSite/qa7bvhexetcawa34ddhr'
  },
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560479/CampSite/tizjdnml3smwq61wdlhf.jpg',
    filename: 'CampSite/tizjdnml3smwq61wdlhf'
  }
]

const image2 = [
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560480/CampSite/p91jioqh1pyexfiqh9tq.jpg',
    filename: 'CampSite/p91jioqh1pyexfiqh9tq'
  },
  {
    url: 'https://res.cloudinary.com/dsj72bvir/image/upload/v1694560480/CampSite/optjbqjbyjuwioajq3fg.jpg',
    filename: 'CampSite/optjbqjbyjuwioajq3fg'
  }
]


const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async function () {
  await CampGround.deleteMany({})
  for (let i = 0; i < 200; i++) {
    let img = image1
    if (i % 2 === 0) {
      img = image2
    }
    
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 25) + 10
    const c = new CampGround({
      author: '64f9e3234f2fecd062df64af',
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude
        ]
      },
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `${sample(descriptions)}`,
      price: price,
      images: img
    })
    await c.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})