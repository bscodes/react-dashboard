import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../reducers';
import { logoutUser } from '../../actions/auth';
import { useMemo, useState } from 'react';
import { Container } from 'reactstrap';
import { MdClose } from 'react-icons/md';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Navbar = () => {
  const [mobileNavOpened, setMobileNavOpened] = useState<boolean>(false);
  const isDeviceMobile = useMemo(() => window.innerWidth <= 768, []);

  const toggleMobileNav = () => {
    if (isDeviceMobile) {
      setMobileNavOpened(!mobileNavOpened);
    }
  };

  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <header className="sticky">
      <Container>
        <nav
          className={`navbar pt-2 pb-2 ${
            mobileNavOpened ? 'dropdown-opened' : ''
          }`}
        >
          <div className="logo">
            <Link to="/">
              <p>dashboard</p>
            </Link>
          </div>

          {loggedIn && (
            <>
              <div className="dropdown-link-container">
                <Link className="navlink" to="/" onClick={toggleMobileNav}>
                  dashboard
                </Link>
                <Link
                  className="navlink"
                  to="/settings"
                  onClick={toggleMobileNav}
                >
                  settings
                </Link>
                <Link
                  className="navlink"
                  to="/signin"
                  onClick={() => {
                    dispatch(logoutUser());
                    toggleMobileNav();
                  }}
                >
                  Logout
                </Link>
              </div>
              <button
                className="btn mobile-dropdown-toggle"
                onClick={toggleMobileNav}
                aria-hidden="true"
              >
                {mobileNavOpened ? <MdClose /> : <HiOutlineMenuAlt3 />}
              </button>
            </>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
