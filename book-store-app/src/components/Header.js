import { useSelector, useDispatch } from 'react-redux';
import { logInLogOut } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.books);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogIn = () => {
    dispatch(logInLogOut());
  };

  return (
    <>
      {error && <div className="alert alert-danger mb-0">{error}</div>}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button
          className="btn btn-outline-primary"
          type="submit"
          onClick={handleLogIn}
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </nav>
    </>
  );
};

export default Header;
