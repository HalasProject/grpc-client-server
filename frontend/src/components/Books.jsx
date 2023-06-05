import React, { useContext, useEffect } from 'react';
import { BookContext } from '../contexts/BookContext';
import { SettingsContext } from '../contexts/SettingsContext';

export const Books = () => {
  const { books, deleteBook } = useContext(BookContext);
  const { openModal, setBookToUpdate } = useContext(SettingsContext);

  const openModalToUpdateBook = (book) => {
    setBookToUpdate(book);
    openModal();
  };
  return (
    <div>
      <section className="aPntialiased bg-gray-100 text-gray-600 h-screen px-4">
        <div className="flex flex-col justify-center h-full">
          <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100 flex justify-between mx-4 items-center">
              <div className="font-semibold text-gray-800">Manage Books</div>
              <div>
                <button
                  className="bg-blue-500 rounded-sm p-2 px-4 text-white hover:bg-blue-400"
                  onClick={() => openModal()}
                >
                  Add new
                </button>
              </div>
            </header>

            <div className="overflow-x-auto p-3">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-center">Title</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Author</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Price</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Action</div>
                    </th>
                  </tr>
                </thead>

                <tbody className="text-sm divide-y divide-gray-100">
                  {books === false && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">
                        <div
                          className="p-4 items-center flex justify-center"
                          role="status"
                        >
                          <svg
                            aria-hidden="true"
                            className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-gray-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {books.length === 0 && (
                    <tr>
                      <td colSpan="4" className="py-4 text-center">
                        Theirs no book, please create a new one
                      </td>
                    </tr>
                  )}
                  {books.length > 0 &&
                    books.map((book) => (
                      <tr key={book.id}>
                        <td className="p-2">
                          <div className=" text-center font-medium text-gray-800">
                            {book.title}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className=" text-center">{book.author}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center font-medium text-green-500">
                            {book.price.toFixed(2)}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex justify-center space-x-3">
                            <button onClick={() => openModalToUpdateBook(book)}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M7.127 22.562l-7.127 1.438 1.438-7.128 5.689 5.69zm1.414-1.414l11.228-11.225-5.69-5.692-11.227 11.227 5.689 5.69zm9.768-21.148l-2.816 2.817 5.691 5.691 2.816-2.819-5.691-5.689z" />
                              </svg>
                            </button>

                            <button onClick={() => deleteBook(book)}>
                              <svg
                                className="w-8 h-8 hover:text-blue-600 rounded-full hover:bg-gray-100 p-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <input
                type="hidden"
                className="border border-black bg-gray-50"
                x-model="selected"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
