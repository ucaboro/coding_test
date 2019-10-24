let mongoose = require('mongoose');
let TrackModel = require('./models/tracks')
let ContractModel = require('./models/contracts')
let Database = require('./db')
let csv = require('csvtojson');
let csvFilePath= './tracks.csv';

new Database('127.0.0.1:27017', 'code_test')
contractExists().then(()=>{
parseToJSONfromCSV(csvFilePath)
})



async function contractExists(){
    let contractCreated = await ContractModel.exists({name: 'Contract 1'})
    if(!contractCreated){
        let contract = new ContractModel({
            _id: new mongoose.Types.ObjectId(),
            name: 'Contract 1'
          })
        save(contract)
     }
}

async function save(model){
    try {
        const result = await model.save();
        console.log(result);
    } catch (err) {        
        console.log([err.name, err.message, err.stack])
    }
}

function parseArray(arr){
    for (let [index, doc] of arr.entries()){

        let track = new TrackModel({
            _id: new mongoose.Types.ObjectId(),
            title: doc.Title,
            version: doc.Version,
            artist: doc. Artist,
            isrc: doc.ISRC.replace(/[^A-Za-z0-9]/g, ''),
            pLine: doc['P Line'],
            aliases: doc.Aliases.split(";") ,
            contract: doc.Contract
        }) 

        if (index != 0) save(track)
    }
}

function parseToJSONfromCSV(csvFilePath){
 csv()
  .fromFile(csvFilePath) //returns promise in JSON array
  .then(csvData => {      
    parseArray(csvData)
});
}

module.exports = {parseArray}