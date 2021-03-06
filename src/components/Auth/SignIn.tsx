import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { loginUser } from '../../actions/auth';
import { RootState } from '../../reducers';
import './SignIn.scss';

interface IFomData {
  username: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<IFomData>({
    username: 'karn.yong@mecallapi.com',
    password: 'mecallapi',
  });

  const dispatch: Dispatch<any> = useDispatch();
  const { loggedIn, isLoading } = useSelector((state: RootState) => state.auth);

  const navigate: NavigateFunction = useNavigate();

  const { username, password } = formData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(loginUser({ username, password }));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/', { replace: true });
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-in-form">
        <h1>Sign In</h1>

        <fieldset>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handleChange}
            value={username || 'karn.yong@mecallapi.com'}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            value={password || 'mecallapi'}
          />
        </fieldset>
        <button type="submit">{isLoading ? 'Please wait..' : 'Log In'}</button>
      </form>
    </>
  );
};

export default SignIn;
