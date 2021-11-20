import React, { useEffect, useState, useReducer } from "react";
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/user/userSlice";
import { State } from '../../store';

type SettingsFormType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  streetaddr: string;
  postalCode: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phoneno: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid Email').required('Email is requried'),
  password: Yup.string()
    .min(4, 'Minimum is 4 characters')
    .max(20, 'Maximum is 20 characters')
    .required('Password is required'),
  //! Not going to require address
});

let changesMade = false;
let changesSaved = false;

export default function Settings() {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user);
  const {userInfo} = user;

  //! Going to try to get some reverse geocoding api working to get the Street Address from the LatLong
  //! ATM I'm just going to leave street address empty

  const formInitialValues: SettingsFormType = {
    firstName: (userInfo.firstName) ? userInfo.firstName: '',
    lastName: (userInfo.lastName) ? userInfo.lastName: '',
    email: (userInfo.email) ? userInfo.email : '',
    postalCode: (userInfo.postalCode) ? userInfo.postalCode : '',
    password: '          ',
    streetaddr: ''
  };

  const reducer = (state:any, newState:any) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, formInitialValues);

  const handleChange = (e:any) => {
    switch(e.target.id)
    {
      case "name": {
        // Assumes user will only enter two names. Might fix later
        let splitName = e.target.value.split(" ");
        setState({firstName: splitName[0]});
        setState({lastName: splitName[1]});
        break;
      }
      case "email": {
        setState({email: e.target.value})
        break;
      }
      case "password": {
        setState({password: e.target.value})
        break;
      }
      case "postalcode": {
        setState({postalCode: e.target.value})
        break;
      }
      case "streetaddr": {
        setState({streetaddr: e.target.value})
        break;
      }
    }
    if (e.target.id !== "streetaddr")
      changesMade = true; 
  }

  const returnHandler = () => {
    if (changesMade && !changesSaved) {
      swal({
        title: 'Changes have been made',
        text: 'Are you sure you want to leave without saving?',
        icon: 'warning',
        dangerMode: true,
        buttons: {
          deny: {
            text: 'Cancel',
            value: null,
          },
          confirm: {
            text: 'Yes',
            value: true,
          },
        }
      }).then((value) => {
        if (value) {
          changesMade = false;
          changesSaved = false;
          history.push('/');
        }
      })
    }
    else {
      changesMade = false;
      changesSaved = false;
      history.push('/')
    }
  }

  const saveHandler = () => {
    changesSaved = true;
    //? Update to only pass values that have been changed
    dispatch(
      updateUser({
          firstName : state.firstName,
          lastName: state.lastName,
          email: state.email,
          postalCode: state.postalCode,
          password: (state.password !== '          ') ? state.password : null
      })
    );
  }

  return (
    <main className='settings__container'>
      
      <div className='settings__header'>
        <div className="settings__title">
          Settings
        </div>
        <i className='bx bx-left-arrow-alt' onClick={returnHandler}/>
      </div>
      <Formik
        initialValues={formInitialValues}
        onSubmit={saveHandler}
        validationSchema={validationSchema}
        enableReinitialize={true}
      > 
        <Form className='settings__form'>
          <div className="form__container">
            <div className='form__control--text'>
              <label htmlFor='name'>Full Name</label>
              <Field 
                type="text" 
                name="name" 
                id="name" 
                value={state.firstName + " " + state.lastName}
                onChange={handleChange}
              />
              <i className='bx bx-user' />
            </div>
          </div>
          <div className='form__control--text'>
            <label htmlFor='email'>Email Address</label>
            <Field
              type='email'
              name='email'
              id='email'
              autoComplete="off"
              value={state.email}
              onChange={handleChange}
            />
            <i className='bx bx-envelope'/>
          </div>

          <div className='form__control--text'>
            <label htmlFor='password'>Password</label>
            <Field
              type='password'
              name='password'
              id='password'
              value={state.password}
              autoComplete="off"
              onChange={handleChange}
            />
            <i className='bx bx-lock'/>
          </div>

          <div className='form__control--text'>
            <label htmlFor='postalcode'>Postal Code</label>
            <Field
              type='text'
              name='postalcode'
              id='postalcode'
              autoComplete="off"
              value={state.postalCode}
              onChange={handleChange}
            />
            <i className='bx bx-map'/>
          </div>

          <div className='form__control--text'>
            <label htmlFor='streetaddr'>Street Address (Aprox)</label>
            <Field
              type='text'
              name='streetaddr'
              id='streetaddr'
              value={state.streetaddr}
              onChange={handleChange}
            />
            <i className='bx bx-map'/>
          </div>

          {changesMade && 
            <button onClick={saveHandler} className='btn btn-primary btn-save'>
              Save Changes
            </button>
          }
        </Form>
      </Formik>
      <NavBar />
    </main>
  )
}