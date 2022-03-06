import { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from 'reactstrap';
import { loginUser } from '../../actions/auth';
import { RootState } from '../../reducers';

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
    <Container>
      <div className="page-center">
        <Form onSubmit={handleSubmit} className="sign-in-form">
          <Row className="mb-3">
            <h1 className="p-0 m-0">Sign in</h1>
          </Row>

          <FormGroup>
            <Row>
              <Label className="p-0 m-0" for="username">
                Username:
              </Label>
              <Input
                type="text"
                name="username"
                id="username"
                className="mb-3"
                placeholder="Username or email"
                required
                onChange={handleChange}
                value={username || 'karn.yong@mecallapi.com'}
              />
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
              <Label className="p-0 m-0" for="password">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                required
                className="mb-3"
                placeholder="Password"
                onChange={handleChange}
                value={password || 'mecallapi'}
              />
            </Row>
          </FormGroup>
          <Row>
            <Button disabled={isLoading} type="submit" color="dark">
              {!isLoading ? (
                <span>Sign in</span>
              ) : (
                <Spinner color="light" size="sm" />
              )}
            </Button>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
