const csv = require("csvtojson");
const fs = require("fs");

var stream = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");

csv()
    .fromStream(stream)
    .subscribe(function(jsonObj){
        return new Promise(function(resolve,reject){
            fs.writeFileSync('./csv/example.text', JSON.stringify(jsonObj))
        }).catch((error) => {
            console.log(error)
        })
    })
