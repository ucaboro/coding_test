# coding_test

## Initial istructions
You should create a process, that does the following - 

1. Using Mongoose, create models for tracks and contracts.  Fields are described in the attached spreadsheet Models and Fields.xlsx

2. Create a contract, with the name “Contract 1” - we will use this later

3. Open the spreadsheet Track Test Import.xlsx in whatever way you like

4. Aliases, should be split on the semi-colon, and stored as separate values in the aliases field on the model

5. The Contract field should match a contract name in the database.  The rules on matching are - 
 - If the contract name exists, and a contract is found, save the association in the Contract ID field of the track
 - If the contract name exists, and a contract is not found, it should return an error stating the contract cannot be found
 - If no contract name exists, just save track without contract association
 
6. You should ingest any lines that are valid

7. Ingest the data from the spreadsheet, returning any errors in the form of an array, logging them to the console. The errors should define the line number, and the issue that requires fixing. 

## Prerequisites

If you want to work with the project fully, please ensure you have *node.js*, *mocha*, *npm* as well as *mongo* with *mongoose* installed.

The `node index.js` command will run the app, retrieve data from the .csv file and push it to the mongodb accordingly.

![node index.js](https://i.imgur.com/fMFPEnh.png) 

The above screenshot is the output you get as a result. Note that Contract 2 doesn't get stored in the db, since the Contract field doesn't exist in the contracts collection. Also note that initial .csv was complemented with *Track 3* that doesn't have any Contract (blank) and has different characters with ISRC to comply and test instructions 5.3 and information re ISRC chars exclusions. 

The error is a log array that specifies the error type, error message and all the relevant data on where it was triggered.

If initial .csv is used, then the output will be the same, but without Track 3.

![compass screenshot](https://imgur.com/D9EG4aO.png)

The above represent what gets stored in the mongodb using *MongoDB Compass Community*. Track 1 and Track 3 gets stored succesfully.

The `npm test` command will run all availiable tests (11).

![npm test](https://imgur.com/Kd18I7W.png) 

The above represent the output of `npm test` 11 tests split in 3 main groups: Contracts Model testing, Tracks Model testing and main functions (namely converting .csv to .json, and passing array prior to saving it in the db).

 
## Code explanation (Optional)

The main index.js file primarily runs by the below 3 lines:

```
new Database('127.0.0.1:27017', 'code_test')
contractExists().then(()=>{
parseToJSONfromCSV(csvFilePath)
})
```

The first creates a mongodb connection.
The second checks if "Contract 1" has ever been created. If not it gets created and stored (Used to avoid duplications).
The third function parses .csv to .json and stores the data in the db with the used models. 

![folder structure](https://imgur.com/3XT93E8.png) 

The folder structure is simple:
index.js is the main one that runs the app. 
db.js creates connection to the mongoDB (different databases used for prod and testing. Testing also gets cleared after the tests.)
Models folder represent main Contract and Track models with validation.
Test folder has 3 main test groups. 
