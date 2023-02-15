import { useSelector } from 'react-redux';

const Header = () => {
  const { error } = useSelector((state) => state.books);
  return (
    <>
      {error && <div className="alert alert-danger mb-0">{error}</div>}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">My Books</span>

        <button className="btn btn-outline-primary" type="submit">
          Log In
        </button>
      </nav>
    </>
  );
};

export default Header;
