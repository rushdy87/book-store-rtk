import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../../store/bookSlice';
import BookInfo from './BookInfo';
import BooksList from './BooksList';

import './book.css';

const PostContainer = () => {
  const dispatch = useDispatch();
  const { isLoading, books } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  return (
    <>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            isLoading={isLoading}
            books={books}
            isLoggedIn={isLoggedIn}
          />
        </div>
        <div className="col side-line">
          <BookInfo />
        </div>
      </div>
    </>
  );
};

export default PostContainer;
