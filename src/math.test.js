const Util = import('./math');
describe('factoriel',() => {
    test('Test factoriel de 0 => 1', () => {
        expect(Util.factorial(0)).toBe(1);
    });

    test('Test factoriel de 2 => 2', () => {
        expect(Util.factorial(3)).toBe(6);
    });

    test('Test factoriel de 3 => 6', () => {
        expect(Util.factorial(3)).toBe(6);
    });

    test('Test factoriel de 3000', () => {
        expect(()=> {Util.factorial(3000);}).toThrow();
    });

    test('Test factoriel -10', () => {
        expect(()=> {Util.factorial(-10);}).toThrow(/negative/);
    });

    test.each([
        [2,2],
        [3,6],
        [4,24],
        [5,120]
    ])('factorial of %i should equal to %i',(n,expected) => {
        expect(Util.factorial(n)).toBe(expected);
    });
});


describe('isPrime', function () {

    test('Test prime de 1 => false', () => {
        expect(Util.isPrime(1)).toBe(false);
    });
    test('Test prime de 0 => false', () => {
        expect(Util.isPrime(0)).toBe(false);
    });
    test('Test prime < 0 => throw exception', () => {
        expect(() => { Util.isPrime(-10); }).toThrow('Unable to compute prime for n < 0');
    });

    test.each([
        [2, true],
        [5, true],
        [17, true],
        [18, false],
        [53, true],
        [55, false]
    ])(
        'isPrime %i equals to %i',
        (n, expected) => {
            expect(Util.isPrime(n)).toBe(expected);
        }
    );
});

describe('test sum prime',() => {
    test('sum prime of 1 should be 1',() => {
        expect(() => {Util.sumPrime(1);}).toThrow();
    });

    test('sum prime of 0 should be 0',() => {
        expect(() => {Util.sumPrime(0);}).toThrow();
    });

    test('sum prime of 8 should be 17',() => {
        expect(Util.sumPrime(8)).toBe(17);
    });

    test.each([
        [3,5],
        [5,10],
        [11,28],
        [19,77],
        [21,77]
    ])('sum prime of %i should be %i',(n,expected) =>{
        expect(Util.sumPrime(n)).toBe(expected);
    });
});

describe('test fizz buzz', function () {
    test('fizzbuzz of 3 should be [1,2,"Fizz"]',() => {
        expect(Util.fizzBuzz(3)).toEqual([1,2,'Fizz']);
    });

    test('fizzbuzz of 5 should be [1,2,"Fizz",4,"buzz"]',() => {
        expect(Util.fizzBuzz(5)).toEqual([1,2,'Fizz',4,'Buzz']);
    });

    test('fizzbuzz of 15 should be [1,2,"Fizz",4,"buzz"]',() => {
        expect(Util.fizzBuzz(15)).toEqual([1,2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz']);
    });
});

describe('aaa', function () {
    test.each([
        ['Test Unitaire','Uftu Vojubjsf'],
        ['aaA','bbB'],
        ['aa\t','bb\t'],
        ['zzZZ','aaAA'],
        ['%zzZZaa%','%aaAAbb%']
    ])('cipher of %i should be %i',(given,expected) => {
        expect(Util.cipher(given)).toBe(expected);
    });
});
