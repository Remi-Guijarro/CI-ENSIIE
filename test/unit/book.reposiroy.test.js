const BookRepository = require('../../src/book.repository');

describe('Book repository Save', function () {
    test('Save a book', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        repository.save({id: 1, name: 'Unit test',price:5.10,added_at:'2019-02-02'});
        expect(dbMock.write.mock.calls.length).toBe(1);
    });


    test('Save an object which is not a book should throw an error', () => {
        const dbMock = {
            get : jest.fn().mockReturnThis(),
            push : jest.fn().mockReturnThis(),
            write : jest.fn().mockReturnThis()
        };
        const repository = new BookRepository(dbMock);
        expect(() =>{repository.save({id: 1, name: 'Unit test'});}).toThrowError();
    });
});

describe('Book repository getTotalCount',  () => {
    test('Get total books count ',() => {
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            size: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue(12)
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getTotalCount()).toBe(12);
    });
});

describe('Book repository getTotalPrice', () => {
    test('Get total books total price ',() => {
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            map: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([10,10,5.0,1,10])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getTotalPrice()).toBe(36);
    });
});

describe('Book repository getBookByName', () => {
    test('Get book by name ',() => {
        const requestedBookTitle = 'Le petit prince';
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([
                {
                    'id': 1,
                    'name': 'test',
                    'price': 6.1,
                    'added_at': '2019-02-01'
                },
                {
                    'id': 2,
                    'name': requestedBookTitle,
                    'price': 4.1,
                    'added_at': '2019-03-01'
                }
            ])
        };
        const repository = new BookRepository(dbMock);
        const requestedBook = {
            'id': 2,
            'name': requestedBookTitle,
            'price': 4.1,
            'added_at': '2019-03-01'
        };
        expect(repository.getBookByName(requestedBookTitle)).toEqual(requestedBook);
    });

    test('Get book by name should return null if none of books corresponds to the given name ',() => {
        const requestedBookTitle = 'Le petit prince';
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([
                {
                    'id': 1,
                    'name': 'test',
                    'price': 6.1,
                    'added_at': '2019-02-01'
                },
                {
                    'id': 2,
                    'name': 'Un livre random',
                    'price': 4.1,
                    'added_at': '2019-03-01'
                }
            ])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getBookByName(requestedBookTitle)).toEqual(null);
    });
});

describe('getCountBookAddedByMonth tests', () => {
    const addMultipleTimes = ((objectToAdd,container,times) =>{
        for(let i=0 ; i < times ; i++){
            container.push(objectToAdd);
        }
        return container;
    });

    test('if db is empty getCountBookAddedByMonth should return an empty array', () => {
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            map: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getCountBookAddedByMonth()).toEqual([]);
    });

    test('if db isn\'t empty getCountBookAddedByMonth should return an array which lenght must be greater than 0', () => {
        const dbMock = {
            get: jest.fn().mockReturnThis(),
            map: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue([
                {
                    'name': 'test',
                    'price': 6.1,
                    'added_at': '2019-02-01'
                },
                {
                    'name': 'Un livre random',
                    'price': 4.1,
                    'added_at': '2019-03-01'
                }
            ])
        };
        const repository = new BookRepository(dbMock);
        expect(repository.getCountBookAddedByMonth().length).toBeGreaterThan(0);
    });

    test('given theses a set of books' +
        '[' +
            '{name:test,added_at:2019-01-21} added Times : 20' +
            '{name:test,added_at:2019-02-21} added Times : 20' +
            '{name:test,added_at:2019-04-21} added Times : 20' +
        '] should return and array of length 3 :  ' +
        '[' +
            '{ year: 2019, month: 0, count: 20, count_cumulative: 20},' +
            '{ year: 2019, month: 1, count: 20, count_cumulative: 40},' +
            '{ year: 2019, month: 3, count: 20, count_cumulative: 60}' +
        ']',() => {
            let values = [];

            values = addMultipleTimes({
                'name': 'Unit Test in Java with Junit',
                'price': 6.1,
                'added_at': '2019-01-21'
            },values,20);

            values = addMultipleTimes({
                'name': 'Design Pattern HeadFirst',
                'price': 4.1,
                'added_at': '2019-02-21'
            },values,20);

            values = addMultipleTimes({
                'name': 'XML for Dummies',
                'price': 4.1,
                'added_at': '2019-04-21'
            },values,20);

        const dbMock = {
                get: jest.fn().mockReturnThis(),
                map: jest.fn().mockReturnThis(),
                value: jest.fn().mockReturnValue(values)
            };
            const bookRepository = new BookRepository(dbMock);
            expect(bookRepository.getCountBookAddedByMonth()).toEqual([
                { year: 2019, month: 1, count: 20, count_cumulative: 20},
                { year: 2019, month: 2, count: 20, count_cumulative: 40},
                { year: 2019, month: 4, count: 20, count_cumulative: 60}
            ]);
    });


    test('given theses a set of books added at different month and year' +
        '[' +
        '{name:test,added_at:2018-01-21} added Times : 10' +
        '{name:test,added_at:2019-02-21} added Times : 20' +
        '{name:test,added_at:2020-04-21} added Times : 30' +
        '] should return and array of length 3 :  ' +
        '[' +
        '{ year: 2018, month: 0, count: 10, count_cumulative: 10},' +
        '{ year: 2019, month: 1, count: 20, count_cumulative: 30},' +
        '{ year: 2020, month: 3, count: 30, count_cumulative: 60}' +
        ']',() => {
        let values = [];
        values = addMultipleTimes({
            'name': 'Unit Test in Java with Junit',
            'price': 6.1,
            'added_at': '2018-01-21'
        },values,10);

        values = addMultipleTimes({
            'name': 'Design Pattern HeadFirst',
            'price': 4.1,
            'added_at': '2019-02-21'
        },values,20);

        values = addMultipleTimes({
            'name': 'XML for Dummies',
            'price': 4.1,
            'added_at': '2020-04-21'
        },values,30);

        const dbMock = {
            get: jest.fn().mockReturnThis(),
            map: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue(values)
        };
        const bookRepository = new BookRepository(dbMock);
        expect(bookRepository.getCountBookAddedByMonth()).toEqual([
            { year: 2018, month: 1, count: 10, count_cumulative: 10},
            { year: 2019, month: 2, count: 20, count_cumulative: 30},
            { year: 2020, month: 4, count: 30, count_cumulative: 60}
        ]);
    });

    test('given theses a set of books added at same month and year' +
        '[' +
        '{name:test,added_at:2018-01-21} added Times : 10' +
        '{name:test,added_at:2018-01-21} added Times : 20' +
        '{name:test,added_at:2018-01-21} added Times : 30' +
        '] should return and array of length 3 :  ' +
        '[' +
            '{ year: 2018, month: 1, count: 60, count_cumulative: 60},' +
        ']',() => {
        let values = [];
        values = addMultipleTimes({
            'name': 'Unit Test in Java with Junit',
            'price': 6.1,
            'added_at': '2018-01-21'
        },values,10);

        values = addMultipleTimes({
            'name': 'Design Pattern HeadFirst',
            'price': 4.1,
            'added_at': '2018-01-21'
        },values,20);

        values = addMultipleTimes({
            'name': 'XML for Dummies',
            'price': 4.1,
            'added_at': '2018-01-21'
        },values,30);

        const dbMock = {
            get: jest.fn().mockReturnThis(),
            map: jest.fn().mockReturnThis(),
            value: jest.fn().mockReturnValue(values)
        };
        const bookRepository = new BookRepository(dbMock);
        expect(bookRepository.getCountBookAddedByMonth()).toEqual([
            { year: 2018, month: 1, count: 60, count_cumulative: 60},
        ]);
    });
});
