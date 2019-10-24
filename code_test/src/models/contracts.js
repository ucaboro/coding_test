let mongoose = require('mongoose')

var contractsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, unique: true} //unique for testing task
 })

module.exports = mongoose.model('Contracts', contractsSchema)