import axios from 'axios';
import * as Yup from 'yup';
import swal from 'sweetalert';
import SlickImages from '../../components/SlickImages/SlickImages';
import React, { useRef, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';

type Props = {
  itemId: string;
  mode: string;
  submitLoading: boolean;
  deleteLoading: boolean;
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  onReturn: (imageUrls: string[], isModified: boolean) => void;
  onDelete: () => void;
};

type FormValues = {
  name: string;
  price: string;
  description: string;
  images: string[];
};

export default function ManageItemForm(props: Props) {
  const {
    itemId,
    mode,
    onSubmit,
    onReturn,
    onDelete,
    initialValues,
    submitLoading,
    deleteLoading,
  } = props;

  // imageUrlRef is used to track the image urls of the images have been uploaded to delete it from the cloudinary server if the item is not created or updated
  const newImageUrlsRef = useRef<string[]>(initialValues.images);
  const [imgLoading, setImgLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Product Name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    description: Yup.string().required('Description is required'),
    images: Yup.array().min(1, 'At least one image is required'),
  });

  /**
   * Handle uploading images to cloudinary server
   * @param e Form event
   * @param form Formik Props
   */
  const uploadImagesHandler = (e: any, form: FormikProps<FormValues>) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();

    if (files.length !== 0) {
      files.forEach((image: any) => {
        formData.append('file', image);
      });

      setImgLoading(true);
      axios
        .post('/api/images', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(({ data }: any) => {
          setImgLoading(false);

          // Set the image urls to the form values
          const productImages = form.values.images;
          form.setFieldValue('images', [...productImages, ...data.data.images]);

          // Set the image urls to the newImageUrlsRef
          newImageUrlsRef.current = [
            ...newImageUrlsRef.current,
            ...data.data.images,
          ];

          swal({
            title: 'Success',
            text: 'Images uploaded successfully',
            icon: 'success',
          });
        })
        .catch((err) => {
          setImgLoading(false);
          swal({
            title: 'Error',
            text: `${err}`,
            icon: 'error',
          });
        });
    } else {
      swal({
        title: 'Error',
        text: 'File(s) not found',
        icon: 'error',
      });
    }
  };

  /**
   * Handle deleting images from cloudinary server, the form values and update the item's images in "edit" mode
   * @param formik Formik Props
   */
  const deleteItemHandler = (formik: FormikProps<FormValues>) => {
    const productImages = formik.values.images;
    const currentImage = productImages[currentImageIndex];

    const imageName = productImages
      .filter((item) => item === currentImage)[0]
      .split('/')
      .pop();
    const imageId = imageName!.split('.')[0];

    swal({
      title: 'Warning',
      text: `The image will be deleted permanently even if you don't hit Save! Are you sure you want to delete this image?`,
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
    }).then(() => {
      setImgLoading(true);
      axios
        .delete(`/api/images/${imageId}`)
        .then(() => {
          setImgLoading(false);

          // Remove the image url from the form form values
          const formCurrentImages = productImages.filter(
            (item) => item !== currentImage
          );
          formik.setFieldValue('images', formCurrentImages);

          // Remove the image url from the newImageUrlsRef
          newImageUrlsRef.current.filter((item) => item !== currentImage);

          // Reset the currentImageIndex
          setCurrentImageIndex(0);

          // If the mode is "edit", we need to update the list of image urls immediately to make sure the images are up to date even if the user doesn't hit Save
          if (mode === 'edit') {
            console.log('Deleting image url on server');
            console.log('Item Id: ', itemId);
            axios
              .patch(`/api/items/${itemId}`, {
                images: formCurrentImages,
              })
              .catch((err) => {
                swal({
                  title: 'Error',
                  text: `${err}`,
                  icon: 'error',
                });
              });
          }

          swal({
            title: 'Success',
            text: 'Image deleted successfully',
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
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize
    >
      {(formik) => {
        return (
          <Form className='signup__form'>
            <div className='signup__form-header'>
              <i
                className='bx bx-left-arrow-alt'
                onClick={() => onReturn(newImageUrlsRef.current, formik.dirty)}
              ></i>
              <p className='signup__form-title'>
                {mode === 'new' ? 'New Item' : 'Update Item'}
              </p>
            </div>

            <div className='form__control--text'>
              <label htmlFor='name'>Product Name</label>
              <Field
                type='text'
                name='name'
                id='name'
                placeholder='Product Name'
              />
              <i className='bx bx-purchase-tag'></i>
              <ErrorMessage name='name'>
                {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form__control manage-item__images'>
              {imgLoading ? (
                <i className='bx bx-loader-alt bx-spin bx-rotate-90 manage-item__loading'></i>
              ) : (
                <React.Fragment>
                  <div
                    className={`images__slide ${
                      formik.values.images.length > 0 ? '' : 'hidden'
                    }`}
                  >
                    <SlickImages
                      items={formik.values.images}
                      onChange={(current: number) =>
                        setCurrentImageIndex(current)
                      }
                    />
                  </div>

                  <div className='images__input'>
                    <i className='bx bx-images images__icon'></i>
                    <label
                      className='btn btn-primary images__upload-btn'
                      htmlFor='images'
                    >
                      <i className='bx bx-image-add'></i>
                      Upload Image
                    </label>
                    <Field name='images'>
                      {({ field, form }: any) => {
                        return (
                          <input
                            type='file'
                            multiple
                            id='images'
                            className='images__file-input'
                            onChange={(event: any) =>
                              uploadImagesHandler(event, form)
                            }
                          />
                        );
                      }}
                    </Field>
                    <ErrorMessage name='images'>
                      {(errorMsg) => (
                        <div className='form__error'>{errorMsg}</div>
                      )}
                    </ErrorMessage>
                  </div>
                </React.Fragment>
              )}
            </div>

            {formik.values.images.length > 0 && (
              <div className='images-btns'>
                <label className='btn btn-primary' htmlFor='images'>
                  Upload
                </label>

                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={() => deleteItemHandler(formik)}
                >
                  Delete
                </button>
              </div>
            )}

            <div className='form__control--text'>
              <label htmlFor='price'>Price</label>
              <Field
                type='text'
                name='price'
                id='price'
                placeholder='Item Price'
              />
              <i className='bx bx-dollar-circle'></i>
              <ErrorMessage name='price'>
                {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='form__control--text'>
              <label htmlFor='description'>Description</label>
              <Field
                as='textarea'
                name='description'
                id='description'
                placeholder='Description'
                className='manage-item__description'
              />
              <i className='bx bx-notepad'></i>
              <ErrorMessage name='description'>
                {(errorMsg) => <div className='form__error'>{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className='manage-item__btns'>
              <button type='submit' className='btn btn-primary'>
                {submitLoading ? (
                  <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                ) : (
                  'Save'
                )}
              </button>

              {mode === 'edit' && (
                <button
                  type='button'
                  className='btn btn-danger'
                  onClick={onDelete}
                >
                  {deleteLoading ? (
                    <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                  ) : (
                    'Delete'
                  )}
                </button>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
