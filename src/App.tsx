import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Authenticator, useAuthenticator, useTheme, View, Heading, Text, Button, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Dashboard from './Dashboard';
import JobSearch from './pages/JobSearchPage';
import NftPage from './pages/nft-page'

const components = {
  Header() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Amplify logo"
          src="https://docs.amplify.aws/assets/logo-dark.svg"
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();
    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toResetPassword} size="small" variation="link">
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Create a new account
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button fontWeight="normal" onClick={toSignIn} size="small" variation="link">
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
};

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    name: {
      label: 'Name:',
      placeholder: 'Enter your name:',
      isRequired: true,
      order: 1,
    },
    username: {
      placeholder: 'Enter your email',
      order: 2,
    },
    password: {
      label: 'Password:',
      placeholder: 'Enter your Password:',
      isRequired: true,
      order: 3,
    },
    confirm_password: {
      label: 'Confirm Password:',
      order: 4,
    },
  },
};

function MainApp() {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <main>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/job-search" element={<JobSearch />} />
        <Route path="/nft-page" element={<NftPage />} />
        <Route path="/" element={
          <div>
            <h1>Welcome to the App</h1>
            <p>Please sign in to continue.</p>
          </div>
        } />
      </Routes>
    </main>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <Authenticator formFields={formFields} components={components}>
          {() => (
            <MainApp />
          )}
        </Authenticator>
      </Router>
    </HelmetProvider>
  );
}
