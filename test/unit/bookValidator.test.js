const BookValidator = require('../../src/BookValidator.js');

describe('Book Validator should return false if given argument is null or undefined', () => {
    test('BookValidator with undefined argument', () => {
        const bookvalidator = new BookValidator();
        expect(bookvalidator.isBook(undefined)).toBeFalsy();
    });

    test('BookValidator with null argument', () => {
        const bookvalidator = new BookValidator();
        expect(bookvalidator.isBook(null)).toBeFalsy();
    });
});



describe('Book Validator should check ', () => {
    test('BookValidator must return false if book.id is undefined', () => {
        const bookvalidator = new BookValidator();
        const book =  {
            price : 'aa',
            name : 'bb',
            added_at : 'cc'
        };
        expect(bookvalidator.isBook(undefined)).toBeFalsy();
    });

    test('BookValidator must return false if book.name is undefined', () => {
        const bookvalidator = new BookValidator();
        const book =  {
            id : 2,
            price : 'aa',
            added_at : 'cc'
        };

        expect(bookvalidator.isBook(undefined)).toBeFalsy();
    });

    test('BookValidator must return false if book.price is undefined', () => {
        const bookvalidator = new BookValidator();
        const book =  {
            id : 2,
            name: '',
            added_at : 'cc'
        };
        expect(bookvalidator.isBook(book)).toBeFalsy();
    });

    test('BookValidator must return false if book.added_at is undefined', () => {
        const bookvalidator = new BookValidator();
        const book =  {
            id : 'aa',
            name : '',
            price : 'bb'
        };
        expect(bookvalidator.isBook(book)).toBeFalsy();
    });

    test('BookValidator must return false if given argument is not a book at all', () => {
        const bookvalidator = new BookValidator();
        const book =  {
            a : '',
            b : '',
            c : ''
        };
        expect(bookvalidator.isBook(book)).toBeFalsy();
    });
});
