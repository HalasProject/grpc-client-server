import React, { useContext, useState } from 'react';
import { SettingsContext } from '../contexts/SettingsContext';
import { BookContext } from '../contexts/BookContext';

const Popup = () => {
  const { closeModal, bookToUpdate } = useContext(SettingsContext);
  const { addBook, updateBook } = useContext(BookContext);
  const [newBook, setNewBook] = useState({
    title: bookToUpdate?.title || '',
    author: bookToUpdate?.author || '',
    price: bookToUpdate?.price || 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bookToUpdate) {
      const updtedBook = {
        ...bookToUpdate,
        ...newBook,
      };
      await updateBook(updtedBook, closeModal);
    } else {
      await addBook(newBook, closeModal);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="py-12 bg-gray-700/40 transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
        id="modal"
      >
        <div
          role="alert"
          className="container mx-auto w-11/12 md:w-2/3 max-w-lg"
        >
          <div className="relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
            <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
              Enter Book Details
            </h1>
            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                defaultValue={newBook.title}
                onChange={handleChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="The lean startup"
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Author
              </label>
              <input
                id="author"
                name="author"
                defaultValue={newBook.author}
                onChange={handleChange}
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="Eric Ries"
                required
              />
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-gray-800 text-sm font-bold leading-tight tracking-normal"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                defaultValue={newBook.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                placeholder="10 $"
                required
              />
            </div>

            <div className="flex items-center justify-start w-full">
              <button className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                Submit
              </button>
              <button
                className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
            <button
              className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
              onClick={() => closeModal()}
              aria-label="close modal"
              role="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-x"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Popup;
