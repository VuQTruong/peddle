import React, { useEffect } from 'react';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cleave from 'cleave.js/react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../features/user/userSlice';
import swal from 'sweetalert';
import { State } from '../../store';

export default function UpgradeToPro() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state: State) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    if (userInfo.isPremiumMember) {
      swal({
        title: 'Info',
        text: 'You are already a Premium Member!',
        icon: 'info',
      }).then(() => {
        history.goBack();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialValues = {
    owner: '',
    cardNumber: '',
    cvv: '',
    expireDate: '',
  };

  const validationSchema = Yup.object({
    owner: Yup.string().required('Name on Card is Required'),
    cardNumber: Yup.string().required('Card Number is Required'),
    cvv: Yup.string()
      .min(3, 'Invalid CVV')
      .max(3, 'Invalid CVV')
      .required('CVV is Required'),
    expireDate: Yup.string().required('Expire Date is Required'),
  });

  const onSubmit = async (values: any) => {
    const actionResult: any = await dispatch(
      updateUser({ isPremiumMember: true })
    );

    if (actionResult.meta.requestStatus === 'fulfilled') {
      swal({
        title: 'Success',
        text: 'Congratulation! You have been upgraded to Premium Member!',
        icon: 'success',
      }).then(() => {
        history.goBack();
      });
    } else if (actionResult.meta.requestStatus === 'rejected') {
      swal({
        title: 'Error',
        text: actionResult.payload,
        icon: 'error',
      });
    }
  };

  const returnHandler = () => {
    history.goBack();
  };

  return (
    <main>
      <WavyDivider position='top' />

      <div className='upgrade__form-header'>
        <i className='bx bx-left-arrow-alt' onClick={returnHandler}></i>
        <p className='upgrade__form-title'>Confirm Purchase</p>
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form className='upgrade__form'>
              <div className='form__control--text'>
                <label htmlFor='owner'>Owner</label>
                <Field
                  type='text'
                  id='owner'
                  name='owner'
                  placeholder='Name on Card'
                />
                <i className='bx bxs-user-badge'></i>
                <ErrorMessage name='owner'>
                  {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>

              <div className='form__control--text'>
                <label htmlFor='cardNumber'>Card Number</label>
                {/* <Field
                    type='text'
                    id='cardNumber'
                    name='cardNumber'
                    placeholder='1234 5678 9012 3456'
                  /> */}
                <Field name='cardNumber'>
                  {({ field, form }: any) => {
                    return (
                      <Cleave
                        placeholder='Enter credit card number'
                        options={{
                          creditCard: true,
                        }}
                        {...field}
                        onChange={(e) =>
                          form.setFieldValue('cardNumber', e.target.rawValue)
                        }
                      />
                    );
                  }}
                </Field>
                <i className='bx bx-credit-card'></i>
                <ErrorMessage name='cardNumber'>
                  {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
                </ErrorMessage>
              </div>

              <div className='upgrade__card-info'>
                <div className='form__control--text'>
                  <label htmlFor='cvv'>Security Code</label>
                  <Field name='cvv'>
                    {({ field, form }: any) => {
                      return (
                        <Cleave
                          type='password'
                          placeholder='CVV'
                          options={{
                            blocks: [3],
                            numericOnly: true,
                          }}
                          {...field}
                        />
                      );
                    }}
                  </Field>
                  <i className='bx bx-lock-alt'></i>
                  <ErrorMessage name='cvv'>
                    {(errorMsg) => (
                      <div className='form__error'>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>

                <div className='form__control--text'>
                  <label htmlFor='expireDate'>Expiration Date</label>
                  <Field name='expireDate'>
                    {({ field, form }: any) => {
                      return (
                        <Cleave
                          placeholder='MM/YY'
                          options={{ date: true, datePattern: ['m', 'd'] }}
                          {...field}
                          onChange={(e) =>
                            form.setFieldValue('expireDate', e.target.rawValue)
                          }
                        />
                      );
                    }}
                  </Field>
                  <i className='bx bx-calendar'></i>
                  <ErrorMessage name='expireDate'>
                    {(errorMsg) => (
                      <div className='form__error'>{errorMsg}</div>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <button type='submit' className='btn btn-primary'>
                Upgrade
              </button>
            </Form>
          );
        }}
      </Formik>
    </main>
  );
}
