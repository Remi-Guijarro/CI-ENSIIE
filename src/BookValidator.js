class BookValidator {
    isBook(book){
        return  this.isObjectNullOrUndefined(book) &&  this.isArgumentsDefined(book);
    }

    isArgumentsDefined(book){
        return this.isArgumentDefined(book.id) &&
        this.isArgumentDefined(book.name) &&
        this.isArgumentDefined(book.price) &&
        this.isArgumentDefined(book.added_at);
    }

    isObjectNullOrUndefined(object){
        return (undefined !== object && null !== object);
    }

    isArgumentDefined(argument){
        return undefined !== argument;
    }
}

module.exports = BookValidator;
