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
        const addedBookPerMonth = [];
        let count = 0;
        let count_cumulative = 0;
        const books = this.getBookSortedByDate();
        books.forEach(book => {
            const year = new Date(book.added_at).getFullYear();
            const month = new Date(book.added_at).getMonth()+1;
            count = 0;
            count = this.getBooksBySameDate(book).length;
            if (addedBookPerMonth.filter(result => result.year === year && result.month === month).length === 0) {
                count_cumulative += count;
                addedBookPerMonth.push({year, month, count, count_cumulative});
            }
        });
        return addedBookPerMonth;
    }

    getBooksBySameDate(book){
        const year = new Date(book.added_at).getFullYear();
        const month = new Date(book.added_at).getMonth()+1;
        return this.getBookSortedByDate().filter(filteredBook =>
            new Date(filteredBook.added_at).getFullYear() === year
            &&
            new Date(filteredBook.added_at).getMonth()+1 === month
        );
    }

    getBookSortedByDate(){
        return this.db.get('books').value().sort((
                (book1, book2) => {
                    if(Date.parse(book1.added_at) > Date.parse(book2.added_at)) {return 1;}
                    if (Date.parse(book1.added_at) < Date.parse(book2.added_at)){return -1;}
                    return 0;
                }
            )
        );
    }
}



module.exports = BookRepository;
