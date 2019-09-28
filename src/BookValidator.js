class BookValidator {
    isBook(book){
        if(undefined === book || null === book){
           return false;
        }else {
            return this.isArgumentDefined(book.id) &&
            this.isArgumentDefined(book.name) &&
            this.isArgumentDefined(book.price) &&
            this.isArgumentDefined(book.added_at);
        }
    }

    isArgumentDefined(argument){
        return undefined !== argument;
    }
}

module.exports = BookValidator;
