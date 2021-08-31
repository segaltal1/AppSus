import { utilService } from './util.service.js'
import { storageService } from './storage.service.js'
import { BookData } from '../books.json.js'

export const bookService = {
    query,
    deleteBook,
    getBookById,
    getNextBookId,
    getCurrAge,
    getPriceCurr,
    getCurrLang,
    getPageCount,
    saveReview,
    deleteReview,
    getGoogleBooks,
    addGoogleBook,
    getPrevBookId

}

const KEY = 'books';
const gBooks = storageService.loadFromStorage(KEY) || BookData;

function query(filterBy) {

    if (filterBy) {
        let { title, minPrice, maxPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        const booksToShow = gBooks.filter(book => book.title.includes(title) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice)
        return Promise.resolve(booksToShow)
    }

    return Promise.resolve(gBooks)
}
const API_DB = 'apiBooksDB';
const googleBooks = storageService.loadFromStorage(API_DB) || {};

function getGoogleBooks(searchedName) {
    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${searchedName}`
    if (googleBooks[searchedName]) return Promise.resolve(googleBooks[searchedName])
    return axios.get(url)
        .then((res) => {
            googleBooks[searchedName] = res.data.items
            storageService.saveToStorage(API_DB, googleBooks)
            return Promise.resolve(res.data.items)
        })

}

function deleteBook(bookId) {
    let bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
    return Promise.resolve()
}

function saveReview({ book, review }) {
    review.id = utilService.makeId()
    const bookIdx = gBooks.findIndex((currBook) => {
        return currBook.id === book.id;
    });
    if (!gBooks[bookIdx].reviews) gBooks[bookIdx].reviews = [];
    gBooks[bookIdx].reviews.unshift(review)
    _saveBooksToStorage();
    return Promise.resolve()


}
function deleteReview(bookId, reviewId) {
    const bookIdx = gBooks.findIndex(currBook => currBook.id === bookId);
    const reviewIdx = gBooks[bookIdx].reviews.findIndex(review => review.id === reviewId);
    gBooks[bookIdx].reviews.splice(reviewIdx, 1)
    _saveBooksToStorage();
    return Promise.resolve()
}

function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return bookId === book.id
    })
    return Promise.resolve(book)
}

function addGoogleBook(book) {
    let bookData = book.volumeInfo
    let googleBook = {
        thumbnail: bookData.imageLinks.thumbnail || ' ',
        id: book.id,
        title: bookData.title,
        authors: bookData.authors,
        publishedDate: bookData.publishedDate,
        categories: bookData.categories || ' ',
        language: bookData.language,
        subtitle: bookData.subtitle,
        listPrice: { amount: 20, currencyCode: "ILS", isOnSale: false },
        description:'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor',
        pageCount: bookData.pageCount
    }
    console.log(googleBook);
    gBooks.unshift(googleBook)
    _saveBooksToStorage();
    return Promise.resolve()
}

function saveBook(bookToEdit) {
    return bookToEdit.id ? _updateBook(bookToEdit) : _addBook(bookToEdit)
}

function _addBook(title, price) {
    var book = _createBook(title, price)
    gBooks.unshift(book)
    _saveBooksToStorage();
}

function _updateBook(bookId, newprice) {
    var book = gBooks.find(function (book) {
        return book.id === bookId;
    })
    book.price = newprice;
    _saveBooksToStorage();
    return Promise.resolve()

}

function _createBook(title, price) {
    if (!price) price = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        title,
        price,
        desc,
    }
}

function getNextBookId(bookId) {
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    let nextBookIdx = bookIdx + 1
    if (nextBookIdx === gBooks.length) nextBookIdx = 0
    return gBooks[nextBookIdx].id
}
function getPrevBookId(bookId){
    const bookIdx = gBooks.findIndex(book => book.id === bookId)
    let nextBookIdx = bookIdx - 1
    if (nextBookIdx < 0) nextBookIdx = 0
    return gBooks[nextBookIdx].id
}
function getPriceCurr(currency) {
    switch (currency) {
        case 'EUR':
            return '\u20AC'
            break;
        case 'USD':
            return '$'
            break;
        case 'ILS':
            return '₪'
            break;
    }
}
function getCurrLang(language) {
    switch (language) {
        case 'he':
            return 'Hebrew'
            break;
        case 'en':
            return 'English'
            break;
        case 'sp':
            return 'Spanish'
            break;
    }
}
function getPageCount(pageCount) {
    if (pageCount > 500) return 'Long Reading'
    if (pageCount > 100) return 'Decent Reading'
    if (pageCount < 100) return 'Light Reading'
}

function getCurrAge(publishedDate) {
    let currYear = new Date().getFullYear()
    if (currYear - publishedDate > 10) return 'Veteran Book'
    if (currYear - publishedDate < 1) return 'New!'
}

function _saveBooksToStorage() {
    storageService.saveToStorage(KEY, gBooks)
}
