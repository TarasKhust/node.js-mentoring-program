const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', function (line) {
    const reversOutput  = line.split("").reverse().join("");
    rl.output.write(reversOutput)
    // console.log(reversOutput);
});
