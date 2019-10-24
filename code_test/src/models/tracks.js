let mongoose = require('mongoose')
let Contracts = require('./contracts')


var tracksSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    version: String,
    artist: String, 
    isrc: {type: String, required: true},
    pLine: String, 
    aliases: Array, 
    contract: {
            type: String,
            validate: {
                validator: async (v) => {
                        let contractExists = await Contracts.exists({ name: v}) 
                        if (contractExists){
                            return v
                        } else if (!contractExists&&v.length===0){
                            return 'none'
                        } else {
                            throw Error()
                        }            
                },
                message: 'Contract validation error'
            }
        },
})

module.exports = mongoose.model('Tracks', tracksSchema)