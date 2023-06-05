const { mockBooks } = require('../mocks/books');
const crypto = require('crypto');

function generateRandomId() {
  return crypto.randomBytes(8).toString('hex');
}

const GetBook = ({ request }, callback) => {
  const bookId = request.book_id;
  const book = mockBooks.find((book) => book.id === bookId);
  if (book) {
    callback(null, book);
  }
  throw new Error(`Book not found with ID: ${bookId}`);
};

const ListBooks = ({ request }, callback) => {
  callback(null, { books: mockBooks });
};

const AddBook = ({ request }, callback) => {
  const newBook = request.book;
  newBook.id = generateRandomId();
  mockBooks.push(newBook);
  callback(null, newBook);
};

const UpdateBook = ({ request }, callback) => {
  const bookId = request.book_id;
  const updatedBook = request.book;
  const index = mockBooks.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    mockBooks[index] = { ...updatedBook, id: request.book_id };
    callback(null, mockBooks[index]);
  }
  throw new Error(`Book not found with ID: ${bookId}`);
};

const DeleteBook = ({ request }, callback) => {
  const bookId = request.book_id;
  const index = mockBooks.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    const deletedBook = mockBooks.splice(index, 1)[0];
    callback(null, deletedBook);
  }
  throw new Error(`Book not found with ID: ${bookId}`);
};

module.exports = { GetBook, ListBooks, DeleteBook, AddBook, UpdateBook };
