const mongoose = require('mongoose');
const Database = require('../src/db')
let ContractModel = require('../src/models/contracts')


describe('Database & Model Tests - Contracts', () => {
  before( (done) => {
    new Database('127.0.0.1:27017', 'code_test_tests')
    mongoose.connection.once('open', ()=>done());
  });

  describe('Test Database Create/Read operations with "Contract 1" ', () => {
    it('New contract created & saved to database', (done) => {
        let contract = new ContractModel({
            _id: new mongoose.Types.ObjectId(),
            name: 'Contract 1'
          })
          contract.save(done);
    });

    it('Dont save incorrect format to database', (done) => {
      let wrongContract = new ContractModel({
        _id: new mongoose.Types.ObjectId(),
        notName: 'Contract 1'
      })
      wrongContract.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
});

    it('Should retrieve "Contract 1" from the database', (done) => {
      ContractModel.find({name: 'Contract 1'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });
  });

//not droping the db as Contracts will be re-used for Track Model testing
});