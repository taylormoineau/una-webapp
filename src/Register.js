import {sendJson} from './utils';
import React, {useState} from 'react';
import CreateOutlined from '@material-ui/icons/CreateOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useHistory} from 'react-router-dom';
import {LoginForm} from './loginPage';

export const Register = ({checkAuth, currentUser}) => {
  //The hooks. We might be able to slim the register/login hooks down to one single hook holding an object.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  let history = useHistory();

  //function to submit request to create new user.
  const submitNewUser = async e => {
    e.preventDefault();
    const result = await sendJson('addPerson', {
      email,
      password,
      name
    });
    if (result.error) {
      setError(result.error);
    }
    setComplete(true);
    await checkAuth();
    history.push('/InfoRegister');
  };

  return !currentUser ? (
    <LoginForm
      onSubmit={submitNewUser}
      setName={setName}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}
      icon={<CreateOutlined />}
      text="Register"
      linkText="Already have an account? Sign in!"
      linkURL="/"
      addName={true}
    />
  ) : (
    !complete && (
      <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5">
          Already logged in! Redirecting to home in 3 seconds....
        </Typography>
        {setTimeout(() => history.push('/'), 3000)}
      </Container>
    )
  );
};
