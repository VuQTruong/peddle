import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import WavyDivider from '../../components/WavyDivider/WavyDivider';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className='signin__container'>
      <section className='signin__header'>
        <h1 className='signin__title'>Peddle.</h1>
        <WavyDivider position='top' />
      </section>

      <form className='signin__form' onSubmit={loginHandler}>
        <p className='signin__form-title'>Login</p>

        <div className='form__input--text'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='example@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <i className='bx bx-envelope'></i>
        </div>

        <div className='form__input--text'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className='bx bx-lock'></i>
        </div>

        <div className='signin__form--btn flex col'>
          <button type='submit' className='btn btn-primary signin_btn-login'>
            Login
          </button>
          <Link to='/forgotpassword' className='signin__link'>
            Forgot Password?
          </Link>
        </div>
      </form>

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
