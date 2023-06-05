// MyContext.js
import React, { useEffect, useState } from 'react';
import { bookClient } from '../utils/Clients';
const {
  ListBooksRequest,
  DeleteBookRequest,
  AddBookRequest,
  UpdateBookRequest,
  Book,
} = require('../clients/book_pb.js');

export const BookContext = React.createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(false);

  const listBooks = async () => {
    const request = new ListBooksRequest();
    bookClient().listBooks(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err.message);
        setBooks([]);
        return;
      }
      const { booksList } = response.toObject();
      setBooks(booksList);
    });
  };

  const deleteBook = async (book) => {
    const { id } = book;
    const request = new DeleteBookRequest();
    request.setBookId(id);
    bookClient().deleteBook(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err.message);
        return;
      }
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
    });
  };

  const addBook = async (book, callback) => {
    const { title, author, price } = book;
    const request = new AddBookRequest();
    const bookReq = new Book();
    bookReq.setTitle(title).setAuthor(author).setPrice(+price);
    request.setBook(bookReq);
    bookClient().addBook(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err.message);
        return;
      }
      const createdBook = response.toObject();
      setBooks([...books, createdBook]);
      callback();
    });
  };

  const updateBook = async (book, callback) => {
    const { title, author, price, id } = book;
    const request = new UpdateBookRequest();
    const bookReq = new Book();

    bookReq.setTitle(title).setAuthor(author).setPrice(+price);

    request.setBookId(id);
    request.setBook(bookReq);

    bookClient().updateBook(request, {}, (err, response) => {
      if (err) {
        console.error('Error:', err.message);
        return;
      }
      const updatedBook = response.toObject();

      setBooks((prevBooks) => {
        return prevBooks.map((book) => {
          if (book.id === updatedBook.id) {
            return {
              ...book,
              ...updatedBook,
            };
          }
          return book;
        });
      });

      callback();
    });
  };

  useEffect(() => {
    listBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, addBook, deleteBook, updateBook }}>
      {children}
    </BookContext.Provider>
  );
};
