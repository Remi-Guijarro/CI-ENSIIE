const Util = {};
Util.factorial = n => {
    if (n === 0) {
        return 1;
    }

    if (n >= 3000) {
        throw 'n too large';
    }

    if (n < 0) {
        throw 'n is negative';
    }

    return n * Util.factorial(n - 1);
};

/**
 * Détermine si n est un nombre premier.
 * Util.isPrime(5) => false
 * Util.isPrime(6) => true
 *
 * @param {number} n
 * @returns {boolean}
 */
Util.isPrime = function (n) {
    if (n === 1 || n === 0) {
        return false;
    }
    if (n < 0) {
        throw 'Unable to compute prime for n < 0';
    }
    for (let i = 2; i < n; i++) {
        if (n % i === 0){return false;}
    }
    return true;

};


/**
 * Additionne l'ensemble des nombres premiers de 2 à n
 *
 * Util.sumPrime(6) = 2 + 3 + 5 = 10
 * Util.sumPrime(8) = 2 + 3 + 5 + 7 = 17
 *
 * @param {number} n
 * @returns {number}
 */
Util.sumPrime = function(n) {
    if(n < 2){
        throw new Error('n should be equal be greater or equal to 2');
    }else {
        let sum = 0;
        for(let i = 2 ; i <= n ; i++){
            if(Util.isPrime(i)){
                sum+=i;
            }
        }
        return sum;
    }
};

/**
 * Cette méthode doit retourner un tableau de 1 à n tel que:
 * - Pour les nombres multiples de 3, les remplacer par "Fizz"
 * - Pour les nombres multiples de 5, les remplacer par "Buzz"
 * - Pour les nombres multiples de 3 et 5, les remplacer par "FizzBuzz"
 *
 * Exp :
 * Util.fizzBuzz(15) => [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
 *
 * @param {number} n
 * @returns {array}
 */
Util.fizzBuzz = function(n) {
    const array = [];
    for(let i = 1 ; i <= n ; i++){
        if (i % 5 === 0 && i % 3 === 0){
            array.push('FizzBuzz');
        }else if(i % 3 === 0){
            array.push('Fizz');
        }else if(i % 5 === 0){
            array.push('Buzz');
        } else {
            array.push(i);
        }
    }
    return array;
};

/**
 * Chiffre une phrase selon la règle suivante : Les A deviennent des B, les B des C, etc.
 *
 * Exp :
 * Util.cipher("Test Unitaire") => "Uftu Vojubjsf"
 *
 * @param phrase
 * @returns {string}
 */
Util.cipher = function (phrase) {
    let encodedString = '';
    const a = 'a', A = 'A';
    for(let i = 0 ; i < phrase.length ; i++){
        if(phrase.charCodeAt(i) > 96 && phrase.charCodeAt(i) < 123 ||
            phrase.charCodeAt(i) < 91 && phrase.charCodeAt(i) > 64){
            if(String.fromCharCode(phrase.charCodeAt(i)) === 'z'){
                encodedString += a;
            }else if (String.fromCharCode(phrase.charCodeAt(i)) === 'Z') {
                encodedString += A;
            }else {
                encodedString += String.fromCharCode(phrase.charCodeAt(i)+1);
            }
        } else {
            encodedString += String.fromCharCode(phrase.charCodeAt(i));
        }
    }
    return encodedString;
};


module.exports = Util;

