import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line',  (line) => {
    const reversOutput  = line.split('').reverse().join('');
    console.log(reversOutput);
}).on('close', () => {
    process.exit(0);
});
