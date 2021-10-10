const csv = require("csvtojson");
const fs = require("fs");

var stream = fs.createReadStream("./csv/nodejs-hw1-ex1.csv");

csv()
    .fromStream(stream)
    .subscribe(function(jsonObj){ //single json object will be emitted for each csv line
        return new Promise(function(resolve,reject){
            fs.writeFileSync('./csv/example.text', JSON.stringify(resolve))
        }).catch((error) => {
            console.log(error)
        })
    })
