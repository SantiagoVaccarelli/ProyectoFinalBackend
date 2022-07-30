function randomNumbers(cant) {
    const numbers = [];
    for (let i = 0; i++ < cant;) numbers.push(Math.floor(Math.random() * 1000))
    return numbers;
}

process.on('message', (cant) => {
    const numbers = randomNumbers(cant);
    process.send(numbers);
})