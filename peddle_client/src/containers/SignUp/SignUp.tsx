import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import WavyDivider from '../../components/WavyDivider/WavyDivider';

export default function SignUp() {
  const [name, setName] = useState('');
  const [phoneno, setPhoneno] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <main className='signup__container'>
      <WavyDivider position='top' />

      <form className='signup__form' onSubmit={registerHandler}>
        <div className='signup__form-header'>
          <i className='bx bx-left-arrow-alt'></i>
          <p className='signup__form-title'>Create Account</p>
        </div>

        <div className='form__input--text'>
          <label htmlFor='name'>Full Name</label>
          <input
            type='text'
            name='name'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i className='bx bx-user'></i>
        </div>

        <div className='form__input--text'>
          <label htmlFor='phoneno'>Phone Number</label>
          <input
            type='text'
            name='phoneno'
            placeholder='Phone number'
            value={phoneno}
            onChange={(e) => setPhoneno(e.target.value)}
          />
          <i className='bx bx-mobile-alt'></i>
        </div>

        <div className='form__input--text'>
          <label htmlFor='email'>Email Address</label>
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
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <i className='bx bx-lock'></i>
        </div>

        <div className='form__input--text'>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmpassword'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <i className='bx bx-lock'></i>
        </div>

        <button type='submit' className='btn btn-primary signup__btn-register'>
          Sign up
        </button>
      </form>

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
