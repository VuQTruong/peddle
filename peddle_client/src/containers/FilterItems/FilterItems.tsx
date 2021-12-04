import { ErrorMessage, Field, Form, Formik, FormikValues } from 'formik';
import { useHistory } from 'react-router';
import NavBar from '../../components/NavBar/NavBar';
import * as Yup from 'yup';
import Cleave from 'cleave.js/react';
import queryBuilder from '../../utilities/queryBuilder';
import { useDispatch } from 'react-redux';
import { getFilteredItems } from '../../features/item/filteredItemsSlice';
import qs from 'qs';
import { useEffect } from 'react';
import FilteredItemList from '../../components/FilteredItemList/FilteredItemList';

export default function FilterItems() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = history.location;

  const formInitialValues = {
    name: '',
    lowPrice: '',
    highPrice: '',
    sortBy: '',
  };

  const validationSchema = Yup.object({});

  // Parsing query string to object
  useEffect(() => {
    const queryObj: any = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    if (Object.keys(queryObj).length > 0) {
      queryObj.name && (formInitialValues.name = queryObj.name.regex);

      queryObj.price &&
        queryObj.price.gte &&
        (formInitialValues.lowPrice = queryObj.price.gte);

      queryObj.price &&
        queryObj.price.lte &&
        (formInitialValues.highPrice = queryObj.price.lte);

      queryObj.sort &&
        (queryObj.sort === 'price'
          ? (formInitialValues.sortBy = 'price')
          : (formInitialValues.sortBy = '-price'));

      dispatch(getFilteredItems(location.search.replace(/\?/, '')));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSubmit = (values: FormikValues) => {
    const queryObj: any = {};

    values.name &&
      (queryObj['name'] = {
        regex: values.name.replace(/\s/g, '+'),
      });

    if (values.lowPrice || values.highPrice) {
      if (!values.lowPrice) {
        queryObj.price = {
          lt: values.highPrice,
        };
      } else if (!values.highPrice) {
        queryObj.price = {
          gte: values.lowPrice,
        };
      } else {
        queryObj.price = {
          gte: values.lowPrice,
          lt: values.highPrice,
        };
      }
    }

    if (values.sortBy === 'lowest') {
      queryObj.sort = 'price';
    } else if (values.sortBy === 'highest') {
      queryObj.sort = '-price';
    }
    // Build Query String
    const queryString = queryBuilder(queryObj);

    dispatch(getFilteredItems(queryString));
    history.push(`/search?${queryString}`);
  };

  const returnHandler = () => {
    history.goBack();
  };

  return (
    <main>
      <div className='container search__container'>
        <section className='search__header'>
          <i className='bx bx-left-arrow-alt' onClick={returnHandler}></i>
          <p className='cart__title'>Filter Items</p>
        </section>

        <Formik
          initialValues={formInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className='search__form'>
                <div className='search__input-section'>
                  <div className='search__input'>
                    <label htmlFor='name'>Title</label>
                    <Field
                      type='text'
                      id='name'
                      name='name'
                      placeholder='Name of Product'
                    />
                    <ErrorMessage name='name'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>

                  <div className='search__price'>
                    <div className='search__input'>
                      <label htmlFor='lowPrice'>From</label>
                      <Field name='lowPrice'>
                        {({ field, form }: any) => {
                          return (
                            <Cleave
                              id='lowPrice'
                              placeholder='Low Price'
                              options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand',
                              }}
                              {...field}
                              onChange={(event: any) => {
                                const value = event.target.rawValue
                                  .replace(',', '')
                                  .replace('$ ', '');
                                form.setFieldValue('lowPrice', value);
                              }}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name='lowPrice'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>

                    <div className='search__input'>
                      <label htmlFor='highPrice'>To</label>
                      <Field name='highPrice'>
                        {({ field, form }: any) => {
                          return (
                            <Cleave
                              id='highPrice'
                              placeholder='High Price'
                              options={{
                                numeral: true,
                                numeralThousandsGroupStyle: 'thousand',
                              }}
                              {...field}
                              onChange={(event: any) => {
                                const value = event.target.rawValue
                                  .replace(',', '')
                                  .replace('$ ', '');
                                form.setFieldValue('highPrice', value);
                              }}
                            />
                          );
                        }}
                      </Field>
                      <ErrorMessage name='highPrice'>
                        {(errorMsg) => (
                          <div className='form__error'>{errorMsg}</div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>

                  <div className='search__input'>
                    <label htmlFor='sortBy'>Sort</label>
                    <Field as='select' id='sortBy' name='sortBy'>
                      <option value='none'>None</option>
                      <option value='price'>Lowest - Highest</option>
                      <option value='-price'>Highest - Lowest</option>
                    </Field>
                    <ErrorMessage name='sortBy'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <button type='submit' className='btn btn-primary search__btn'>
                  Search
                </button>
              </Form>
            );
          }}
        </Formik>

        <FilteredItemList />
      </div>
      <NavBar />
    </main>
  );
}
