const BookValidator = require('./BookValidator');

class BookRepository {
    /**
     * @param db
     */
    constructor(db) {
        this.db = db;
    }

    save(book) {
        const validator = new BookValidator();
        if(!validator.isBook(book)){
            throw new Error('The given object is not a book');
        }else {
            this.db.get('books').push(book).write();
        }
    }

    /**
     * Nombre total de livre
     */
    getTotalCount() {
        return this.db.get('books').size().value();
    }

    /**
     * Somme du prix de tous les livre
     */
    getTotalPrice() {
        let result = 0;
        this.db.get('books').map('price').value().forEach((price) => {
            result += price;
        });
        return result;
    }


    /**
     * Retourne un livre
     */
    getBookByName(bookName) {
        const requestedBook = this.db.get('books').value().filter(book => book.name === bookName)[0];
        if(requestedBook !== undefined ){
            return requestedBook;
        }else {
            return null;
        }
    }

    /**
     * Nombre de livre ajouté par mois
     *
     *  [
     *      {
     *          year: 2017,
     *          month, 2,
     *          count, 129,
     *          count_cumulative: 129
     *      },
     *      {
     *          year: 2017,
     *          month, 3,
     *          count, 200,
     *          count_cumulative: 329
     *      },
     *      ....
     *  ]
     */
    getCountBookAddedByMonth() {

    }

}



module.exports = BookRepository;
