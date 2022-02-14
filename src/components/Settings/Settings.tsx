import { useSelector } from 'react-redux';
import { useGetUsers } from '../../hooks/useGetUsers';
import { RootState } from '../../reducers';
import './Settings.scss';

const Settings = () => {
  const { loggedIn } = useSelector((state: RootState) => state.auth);
  const { users, error } = useGetUsers(loggedIn);

  return (
    <div className="settings-wrapper">
      {error && <div>{error.message}</div>}
      {users && (
        <>
          <h3>Users</h3>
          <ol>
            {users.map((item) => (
              <>
                <li className="user">{item.name}</li>
              </>
            ))}
          </ol>
        </>
      )}
    </div>
  );
};

export default Settings;
