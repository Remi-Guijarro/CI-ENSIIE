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
