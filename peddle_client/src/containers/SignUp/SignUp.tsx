import { Link } from 'react-router-dom';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

type SignUpFormType = {
  name: string;
  phoneno: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const formInitialValues: SignUpFormType = {
  name: '',
  phoneno: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phoneno: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid Email').required('Email is requried'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .test('confirm-password', 'Confirm password must match', function (value) {
      return this.parent.password === value;
    }),
});

export default function SignUp() {
  const registerHandler = (values: SignUpFormType) => {
    console.log(values);
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
            <i className='bx bx-left-arrow-alt'></i>
            <p className='signup__form-title'>Create Account</p>
          </div>

          <div className='form__control--text'>
            <label htmlFor='name'>Full Name</label>
            <Field type='text' name='name' id='name' placeholder='Your Name' />
            <i className='bx bx-user'></i>
            <ErrorMessage name='name'>
              {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
            </ErrorMessage>
          </div>

          <div className='form__control--text'>
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
          </div>

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
            Sign up
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
