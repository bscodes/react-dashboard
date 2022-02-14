import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAuth } from '../../actions/auth';
import { RootState } from '../../reducers';

const ProtectedRoute = () => {
  const { loggedIn, authChecked } = useSelector(
    (state: RootState) => state.auth
  );
  console.log('ProtectedRoute', { loggedIn, authChecked });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  } else if (!loggedIn) {
    return (
      <>
        <Navigate to="/signin" />
      </>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
