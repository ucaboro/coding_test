const TrackModel = require('../src/models/tracks')
const mongoose = require('mongoose');
const csv = require('csvtojson');
const csvFilePath= './src/tracks.csv'; 



  describe('Test all used functions ', () => {
    it('parseArray parses json, split aliases in array, removes chars from ISRC and avoids header data', (done) => {
        let tracks = []
        for (let [index, doc] of array.entries()){

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
    
            if (index != 0)   tracks.push(track);
        }

        if(tracks[0].aliases.length===2&&tracks[0].isrc==='ISRC1'&&tracks[0].title!= '') done()
        throw new Error('Tracks dont parse correctly');        
    });

    it('Converts csv to json', (done) => {
    csv()
    .fromFile(csvFilePath) 
    .then(csvData => {      
        if(Array.isArray(csvData)){
             done()
            } else {
            throw new Error('CSV conversion failed'); 
         }
        });
    });

});

  let array = [
    {
      ID: 'Leave blank if a new Track',
      Title: '',
      Version: '',
      Artist: '',
      ISRC: 'Any dashes, spaces or other characters will be stripped out on import',
      'P Line': '',
      Aliases: 'Separate multiple alises using a semi-colon (;)',
      Contract: 'Should match the contract name exactly'
    },
    {
      ID: '',
      Title: 'Track 1',
      Version: 'Version 1',
      Artist: 'Artist 1',
      ISRC: 'ISRC1',
      'P Line': 'P Line 1',
      Aliases: 'aliases1;aliases2',
      Contract: 'Contract 1'
    },
    {
      ID: '',
      Title: 'Track 2',
      Version: 'Version 2',
      Artist: 'Artist 2',
      ISRC: 'ISRC2',
      'P Line': 'P Line 2',
      Aliases: 'aliases11 ; aliases22',
      Contract: 'Contract 2'
    },
    {
      ID: '',
      Title: 'Track 3',
      Version: 'Version 3',
      Artist: 'Artist 3',
      ISRC: '; ,. ISRC3 - /. ;',
      'P Line': 'P Line 3',
      Aliases: 'aliases111 ; aliases222',
      Contract: ''
    }
  ]


  