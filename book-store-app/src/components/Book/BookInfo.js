import { useSelector } from 'react-redux';

const BookInfo = () => {
  const { bookInfo } = useSelector((state) => state.books);
  return (
    <>
      <h2>Book Details</h2>
      {bookInfo ? (
        <div>
          <p className="fw-bold">Title:{bookInfo.title}</p>
          <p className="fw-bold">Inserted By:{bookInfo.userName}</p>
          <p className="fw-light">Description:{bookInfo.description}</p>
          <p className="fst-italic">Price:{bookInfo.price}</p>
        </div>
      ) : (
        <div className="alert alert-secondary" role="alert">
          There is no Book selected yet. Please select!
        </div>
      )}
    </>
  );
};

export default BookInfo;
