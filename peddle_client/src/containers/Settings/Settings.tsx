import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import * as Yup from 'yup';
import swal from 'sweetalert';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikValues,
  FormikProps,
} from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { signOut, updateUser } from '../../features/user/userSlice';
import { State } from '../../store';
import { isURL, isValidPostalCode } from '../../utilities/validators';
import Avatar from 'react-avatar';
import axios from 'axios';

type SettingsFormType = {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  streetaddr?: string;
  postalCode: string;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last Name is required'),
  password: Yup.string()
    .min(4, 'Minimum is 4 characters')
    .max(20, 'Maximum is 20 characters')
    .optional(),
  postalCode: Yup.string()
    .required('Postal code is required')
    .test('postal-code', 'Invalid Postal Code: XXX-XXX', function (value) {
      return isValidPostalCode(value);
    }),
  //! Not going to require address
});

let changesSaved = false;

export default function Settings() {
  const history = useHistory();
  const dispatch = useDispatch();
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const [imgLoading, setImgLoading] = useState(false);

  const user = useSelector((state: State) => state.user);
  const { userInfo } = user;

  //! Going to try to get some reverse geocoding api working to get the Street Address from the LatLong
  //! ATM I'm just going to leave street address empty

  const formInitialValues: SettingsFormType = {
    photo: userInfo.photo ? userInfo.photo : '',
    firstName: userInfo.firstName ? userInfo.firstName : '',
    lastName: userInfo.lastName ? userInfo.lastName : '',
    email: userInfo.email ? userInfo.email : '',
    postalCode: userInfo.postalCode ? userInfo.postalCode : '',
    password: '',
    streetaddr: '',
  };

  const returnHandler = () => {
    if (formikRef.current?.dirty && !changesSaved) {
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
        },
      }).then((value) => {
        if (value) {
          changesSaved = false;
          history.push('/');
        }
      });
    } else {
      changesSaved = false;
      history.push('/');
    }
  };

  const saveHandler = async (values: FormikValues) => {
    changesSaved = true;

    //* Because the HTTP request is PATCH, it will only update the fields that have changed. So we just pass everything in the form to the reducer and the server side will take care the rest
    const actionResult: any = await dispatch(updateUser(values));

    if (actionResult.meta.requestStatus === 'fulfilled') {
      swal({
        title: 'Success',
        text: 'User Info updated successfully',
        icon: 'success',
      }).then(() => {
        if (values.password) {
          swal({
            title: 'Success',
            text: 'Password updated successfully. Please Sign In again!',
            icon: 'success',
          }).then(() => {
            dispatch(signOut());
          });
        }
      });
    } else if (actionResult.meta.requestStatus === 'rejected') {
      swal({
        title: 'Error',
        text: actionResult.payload,
        icon: 'error',
      });
    }
  };

  const uploadImagesHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: FormikProps<SettingsFormType>
  ) => {
    // Delete the previous image if there is one
    if (isURL(formInitialValues.photo)) {
      const imageName = formInitialValues.photo.split('/').pop();
      const imageId = imageName!.split('.')[0];
      axios.delete(`/api/images/${imageId}`);
    }

    // Upload the new image to cloudinary
    const file = e.target.files![0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      setImgLoading(true);
      axios
        .post('/api/images', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }: any) => {
          setImgLoading(false);
          form.setFieldValue('photo', data.data.images[0]);

          // Update the photo field on server
          dispatch(updateUser({ photo: data.data.images[0] }));
          swal({
            title: 'Success',
            text: 'Avatar updated successfully',
            icon: 'success',
          });
        })
        .catch((error) => {
          swal({
            title: 'Error',
            text: `${error}`,
            icon: 'error',
          });
        });
    } else {
      swal({
        title: 'Error',
        text: 'File not found',
        icon: 'error',
      });
    }
  };

  return (
    <main>
      <div className='container settings__container'>
        <div className='settings__header'>
          <div className='settings__title'>Settings</div>
          <i className='bx bx-left-arrow-alt' onClick={returnHandler} />
        </div>

        <Formik
          initialValues={formInitialValues}
          onSubmit={saveHandler}
          validationSchema={validationSchema}
          enableReinitialize={true}
          innerRef={formikRef}
        >
          {(formik) => {
            return (
              <Form className='settings__form'>
                <div className='settings__photo'>
                  <div className='settings__user-avatar'>
                    {imgLoading ? (
                      <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                    ) : (
                      <Avatar
                        name={`${formik.values.firstName} ${formik.values.lastName}`}
                        round={true}
                        size='125'
                        textSizeRatio={3}
                        src={
                          isURL(formik.values.photo) ? formik.values.photo : ''
                        }
                      />
                    )}
                  </div>

                  <Field name='images'>
                    {({ field, form }: any) => {
                      return (
                        <input
                          type='file'
                          id='photo'
                          className='images__file-input'
                          onChange={(event: any) =>
                            uploadImagesHandler(event, form)
                          }
                        />
                      );
                    }}
                  </Field>
                  <label
                    className='btn btn-primary settings__upload-btn'
                    htmlFor='photo'
                  >
                    Change Photo
                  </label>
                </div>

                <div className='settings__name-group'>
                  <div className='form__control--text'>
                    <label htmlFor='firstName'>First Name</label>
                    <Field
                      type='text'
                      name='firstName'
                      id='firstName'
                      placeholder='First Name'
                    />
                    <i className='bx bx-user' />
                    <ErrorMessage name='firstName'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className='form__control--text'>
                    <label htmlFor='lastName'>Last Name</label>
                    <Field
                      type='text'
                      name='lastName'
                      id='lastName'
                      placeholder='Last Name'
                    />
                    <i className='bx bx-user' />
                    <ErrorMessage name='lastName'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>

                <div className='form__control--text'>
                  <label htmlFor='email'>Email Address</label>
                  <Field
                    type='email'
                    name='email'
                    id='email'
                    autoComplete='off'
                    readOnly
                  />
                  <i className='bx bx-envelope' />
                </div>

                <div className='form__control--text'>
                  <label htmlFor='password'>Password</label>
                  <Field
                    type='password'
                    name='password'
                    id='password'
                    autoComplete='off'
                    placeholder='Leave blank to keep current password'
                  />
                  <i className='bx bx-lock' />
                  <ErrorMessage name='password'>
                    {(errorMsg) => (
                      <div className='form__error'>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className='form__control--text'>
                  <label htmlFor='postalCode'>Postal Code</label>
                  <Field
                    type='text'
                    name='postalCode'
                    id='postalCode'
                    autoComplete='off'
                    placeholder='Postal Code'
                  />
                  <i className='bx bx-map' />
                  <ErrorMessage name='postalCode'>
                    {(errorMsg) => (
                      <div className='form__error'>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                {/* <div className='form__control--text'>
                  <label htmlFor='streetaddr'>Street Address (Aprox)</label>
                  <Field
                    type='text'
                    name='streetaddr'
                    id='streetaddr'
                    placeholder='Address'
                  />
                  <i className='bx bx-map' />
                  <ErrorMessage name='streetaddr'>
                    {(errorMsg) => (
                      <div className='form__error'>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div> */}

                {formik.dirty && (
                  <button type='submit' className='btn btn-primary btn-save'>
                    Save Changes
                  </button>
                )}
              </Form>
            );
          }}
        </Formik>
      </div>
      <NavBar />
    </main>
  );
}
