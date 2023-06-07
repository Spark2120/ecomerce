import { useState } from 'react';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { publicRequest } from '../requestMethods';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 1.25rem;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 0.625rem 0;
  padding: 0.625rem;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 0.9375rem 1.25rem;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 0.625rem;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Links = styled.a`
  margin: 0.3125rem 0rem;
  font-size: 0.75rem;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await publicRequest.post('/signin', {
        email,
        password
      });
      login(dispatch, { email, password });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
            name='email'
            type='email'
          />
          <Input
            placeholder='password'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            name='password'
          />
          <Button
            onClick={handleClick}
            disabled={isFetching}
          >
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Link to='/register' style={{ textDecoration: 'none', color: 'black' }} >
            <Links>CREATE ACCOUNT</Links>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
