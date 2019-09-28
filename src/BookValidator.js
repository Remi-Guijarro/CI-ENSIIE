class BookValidator {
    isBook(book){
        return undefined !== book && this.isArgumentDefined(book.id) &&
            this.isArgumentDefined(book.name) &&
            this.isArgumentDefined(book.price) &&
            this.isArgumentDefined(book.added_at);
    }

    isArgumentDefined(argument){
        return undefined !== argument;
    }
}

module.exports = BookValidator;
