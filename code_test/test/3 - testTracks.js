const mongoose = require('mongoose');
const Database = require('../src/db')
const TrackModel = require('../src/models/tracks')



describe('Database & Model Tests - Tracks', () => {
    before((done) => {
      new Database('127.0.0.1:27017', 'code_test_tests')
      mongoose.connection.once('open', ()=>done());
    });

  describe('Test Database Create/Read operations with Tracks data ', () => {
    it('New track created & saved to database with title & isrc', (done) => {
        let track = new TrackModel({
            _id: new mongoose.Types.ObjectId(),
            title: 'Track 1',
            isrc: 'ISRC1'
          })
          track.save(done);
    });

    it('Dont save incorrect format to database', (done) => {
      let wrongTrack = new TrackModel({
        _id: new mongoose.Types.ObjectId(),
        notTitle: 'Track 1'
      })
      wrongTrack.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
});

    it('Should check Contract data and save if it exists', (done) => {
        let track = new TrackModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Track 1',
        version: 'Version 1',
        artist: 'Artist 1',
        isrc: 'ISRC1',
        pLine: 'P Line 1',
        contract: 'Contract 1',
        })

        track.save(done)
    });

    it('Should check Contract data and save if it is blank', (done) => {
        let track = new TrackModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Track 1',
        version: 'Version 1',
        artist: 'Artist 1',
        isrc: 'ISRC1',
        pLine: 'P Line 1',
        contract: '',
        })

        track.save(done)
    });

    it('Should check Contract data and throw an error if not found', (done) => {
        let track = new TrackModel({
        _id: new mongoose.Types.ObjectId(),
        title: 'Track 1',
        version: 'Version 1',
        artist: 'Artist 1',
        isrc: 'ISRC1',
        pLine: 'P Line 1',
        contract: 'Contract 2',
        })

        track.save(err => {
            if(err) { return done(); }
            throw new Error('Should generate error!');
          });
    });

    it('Should retrieve "Track 1" from the database', function(done) {
        TrackModel.find({title: 'Track 1'}, (err, name) => {
        if(err) {throw err;}
        if(name.length === 0) {throw new Error('No data!');}
        done();
      });
    });

  });
  
  //Droping the test db after tests and closing connection
   after(function(done){
    mongoose.connection.db.dropDatabase(function(){
      mongoose.connection.close(done);
    });
  }); 
});

