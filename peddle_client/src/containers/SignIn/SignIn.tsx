import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import { resetUserState, signIn } from '../../features/user/userSlice';
import { State } from '../../store';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { setSessionTTL } from '../../features/session/sessionSlice';

type SignInFormType = {
  email: string;
  password: string;
};

const formInitialValues: SignInFormType = {
  email: '',
  password: '',
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid Email').required('Email is requried'),
  password: Yup.string().required('Password is required'),
});

export default function SignIn() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user);
  const { userInfo, loading, error } = user;

  useEffect(() => {
    if (userInfo) {
      swal({
        text: 'Login Successfully',
        icon: 'success',
      }).then((value) => {
        dispatch(setSessionTTL(30 * 60 * 1000));
        history.push('/');
      });
    }

    if (error) {
      swal({
        title: error,
        icon: 'error',
      }).then((value) => {
        dispatch(resetUserState());
      });
    }
  }, [dispatch, error, history, userInfo]);

  const loginHandler = async (values: SignInFormType) => {
    dispatch(signIn(values));
  };

  return (
    <main className='signin__container'>
      <section className='signin__header'>
        <h1 className='signin__title'>Peddle.</h1>
        <WavyDivider position='top' />
      </section>

      <Formik
        initialValues={formInitialValues}
        onSubmit={loginHandler}
        validationSchema={validationSchema}
      >
        <Form className='signin__form'>
          <p className='signin__form-title'>Login</p>

          <div className='form__control--text'>
            <label htmlFor='email'>Email</label>
            <Field
              type='email'
              id='email'
              name='email'
              placeholder='example@gmail.com'
            />
            <i className='bx bx-envelope'></i>
            <ErrorMessage name='email'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='form__control--text'>
            <label htmlFor='password'>Password</label>
            <Field
              type='password'
              id='password'
              name='password'
              placeholder='password'
            />
            <i className='bx bx-lock'></i>
            <ErrorMessage name='password'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='signin__form--btn flex col'>
            <button type='submit' className='btn btn-primary signin_btn-login'>
              {loading ? (
                <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
              ) : (
                'Login'
              )}
            </button>
            <Link to='/forgotpassword' className='signin__link'>
              Forgot Password?
            </Link>
          </div>
        </Form>
      </Formik>

      <section className='signin__footer'>
        Not a member?{' '}
        <span>
          <Link to='/signup' className='signin__link'>
            Sign Up
          </Link>
        </span>
      </section>
    </main>
  );
}
