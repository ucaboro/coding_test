let mongoose = require('mongoose');

class Database {
  constructor(server, database) {
    this._connect(server, database)
  }
  
_connect(server, database) {
     mongoose.connect(`mongodb://${server}/${database}`,  {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
       .then(() => {
         console.log(`✅ Database connection successful (${database})`)
       })
       .catch(err => {
         console.error(`❌ Database connection error (${database})`)
       })
  }
}

module.exports = Database