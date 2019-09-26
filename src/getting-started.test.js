sum = (a,b) => {
    return a + b;
}


module.exports = sum;


test('adds 1 + 1 should be 2', () => {

});

test('2+2 should be 4',() => {
    expect(2+2).toBe(4);
});

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

