import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { State } from '../../store';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import swal from 'sweetalert';
import { isValidPostalCode } from '../../utilities/validators';
import { signUp } from '../../features/user/userSlice';
import { setSessionTTL } from '../../features/session/sessionSlice';

type SignUpFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  postalCode: string;
  // phoneno: string;
};

const formInitialValues: SignUpFormType = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  postalCode: '',
  // phoneno: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid Email').required('Email is requried'),
  password: Yup.string()
    .min(4, 'Minimum is 4 characters')
    .max(20, 'Maximum is 20 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .test('confirm-password', 'Confirm password must match', function (value) {
      return this.parent.password === value;
    }),
  postalCode: Yup.string()
    .required('Postal code is required')
    .test('postal-code', 'Invalid Postal Code: XXX-XXX', function (value) {
      return isValidPostalCode(value);
    }),
  // phoneno: Yup.string().required('Phone Number is required'),
});

export default function SignUp() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user);
  const { userInfo, error, loading } = user;

  useEffect(() => {
    if (userInfo) {
      swal({
        text: 'Account Created Successfully',
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
      });
    }
  }, [dispatch, error, history, userInfo]);

  const registerHandler = (values: SignUpFormType) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      dispatch(
        signUp({
          ...values,
          lat,
          lng,
        })
      );
    });
  };

  const returnHandler = () => {
    history.goBack();
  };

  return (
    <main className='signup__container'>
      <WavyDivider position='top' />

      <Formik
        initialValues={formInitialValues}
        onSubmit={registerHandler}
        validationSchema={validationSchema}
      >
        <Form className='signup__form'>
          <div className='signup__form-header'>
            <i className='bx bx-left-arrow-alt' onClick={returnHandler}></i>
            <p className='signup__form-title'>Create Account</p>
          </div>

          <div className='form__control--text'>
            <label htmlFor='firstName'>First Name</label>
            <Field
              type='text'
              name='firstName'
              id='firstName'
              placeholder='Your First Name'
            />
            <i className='bx bx-user'></i>
            <ErrorMessage name='firstName'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='form__control--text'>
            <label htmlFor='lastName'>Last Name</label>
            <Field
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Your Last Name'
            />
            <i className='bx bx-user'></i>
            <ErrorMessage name='lastName'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='form__control--text'>
            <label htmlFor='postalCode'>Postal Code</label>
            <Field
              type='text'
              name='postalCode'
              id='postalCode'
              placeholder='Postal Code'
            />
            <i className='bx bx-home'></i>
            <ErrorMessage name='postalCode'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          {/* <div className='form__control--text'>
            <label htmlFor='phoneno'>Phone Number</label>
            <Field
              type='text'
              name='phoneno'
              id='phoneno'
              placeholder='Phone number'
            />
            <i className='bx bx-mobile-alt'></i>
            <ErrorMessage name='phoneno'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div> */}

          <div className='form__control--text'>
            <label htmlFor='email'>Email Address</label>
            <Field
              type='email'
              name='email'
              id='email'
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
              name='password'
              id='password'
              placeholder='Password'
            />
            <i className='bx bx-lock'></i>
            <ErrorMessage name='password'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='form__control--text'>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Field
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              placeholder='Confirm Password'
            />
            <i className='bx bx-lock'></i>
            <ErrorMessage name='confirmPassword'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <button
            type='submit'
            className='btn btn-primary signup__btn-register'
          >
            {loading ? (
              <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
            ) : (
              'Sign up'
            )}
          </button>
        </Form>
      </Formik>

      <section className='signup__footer'>
        Already a member?{' '}
        <span>
          <Link to='/signin' className='signup__link'>
            Sign In
          </Link>
        </span>
      </section>
    </main>
  );
}
