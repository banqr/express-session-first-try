const monk = require('monk')
require('dotenv').config({path: '../.env'})
const db = monk(process.env.MONGO_URI)

module.exports = db