import React from 'react';

const BooksList = ({ isLoading, books, isLoggedIn }) => {
  const renderBooksList =
    books.length > 0 ? (
      books.map((book) => {
        return (
          <li
            className="list-group-item d-flex  justify-content-between align-items-center"
            key={book.id}
          >
            <div>{book.title}</div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isLoggedIn}
              >
                Read
              </button>
              <button
                type="button"
                className="btn btn-danger"
                disabled={!isLoggedIn}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })
    ) : (
      <h4>There is No Books available!</h4>
    );

  return (
    <div>
      <h2>Books List</h2>
      {isLoading ? (
        <h1>Loading!!</h1>
      ) : (
        <ul className="list-group">{renderBooksList}</ul>
      )}
    </div>
  );
};

export default BooksList;
