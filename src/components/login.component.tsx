import AuthService from '../services/auth.service';
import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../AuthContext';

const validationSchema = () => {
  return Yup.object().shape({
    username: Yup.string().required("username can not be empty").min(6, "Minimum username length is 6 characters"),
    password: Yup.string().required("Password can not be empty").min(6, "Minimum password length is 6 characters"),
  });
};

const initialValues = {
  username: "",
  password: "",
};

const Login: React.FC = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  const handleLogin = (formValue: { username: string; password: string }) => {
    setLoading(true);
    AuthService.login(formValue).then(
      () => {
        setIsAuthenticated(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setLoading(false);
      }
    );
  };

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="form-control" />
              <ErrorMessage
                name="username"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;