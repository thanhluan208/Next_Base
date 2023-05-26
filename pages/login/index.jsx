import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CommonStyles from 'src/components/commonStyles';
import CommonIcons from 'src/components/commonIcons';
import { Field, Form, Formik } from 'formik';
import customFields from 'src/components/customFields';
import { useAuthentication } from 'src/provider/AuthenticationProvider';
import { useRouter } from 'next/router';

const propTypes = {};

const Login = props => {
  //! State
  const { login, isLogged } = useAuthentication();
  const router = useRouter();

  //! Function

  const handleSubmit = (values, { setSubmitting }) => {
    login({ ...values, setLoading: setSubmitting });
  };

  //! Render
  if (isLogged) {
    router.push('/home');
    return null;
  }

  return (
    <CommonStyles.Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Formik initialValues={{ email: '', password: '' }} onSubmit={handleSubmit}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <CommonStyles.Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Field component={customFields.TextField} name='email' label='Email' />
                <Field component={customFields.TextField} name='password' label='Password' enableShowPassword />
              </CommonStyles.Box>
              <CommonStyles.Button
                sx={{ width: '100%', marginTop: '1rem' }}
                loading={isSubmitting}
                variant='contained'
                type='submit'
              >
                Login
              </CommonStyles.Button>
            </Form>
          );
        }}
      </Formik>
    </CommonStyles.Box>
  );
};

Login.propTypes = propTypes;
export default Login;
