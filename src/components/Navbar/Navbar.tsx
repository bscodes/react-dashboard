import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { logoutUser } from '../../actions/auth';

const Navbar = () => {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">
            <p>dashboard</p>
          </Link>
        </div>
        {loggedIn && (
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link
                to="/signin"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
