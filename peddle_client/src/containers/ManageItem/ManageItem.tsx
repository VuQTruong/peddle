// import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import WavyDivider from '../../components/WavyDivider/WavyDivider';
import { State } from '../../store';
import ManageItemForm from './ManageItemForm';

type Props = {
  mode: string;
} & Partial<any>;

type FormValues = {
  name: string;
  price: string;
  description: string;
  images: string[];
};

export default function ManageItem(props: Props) {
  const history = useHistory();
  const [itemInfo, setItemInfo] = useState<any>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const itemId = props.match.params.itemId;

  //Getting userId from localStorage
  // const { id: userId } = JSON.parse(localStorage.getItem('userInfo')!);
  const { userInfo } = useSelector((state: State) => state.user);
  const { id: userId } = userInfo;

  // If the mode is "edit", fetch the item info from the server
  useEffect(() => {
    if (itemId) {
      axios
        .get(`/api/items/${itemId}`)
        .then(({ data }: any) => {
          setItemInfo(data.data.item);
        })
        .catch((err) => {
          swal({
            title: 'Error',
            text: err.response.data.message,
            icon: 'error',
          }).then(() => {
            history.push('/user/items');
          });
        });
    }
  }, [history, itemId]);

  let initialValues: FormValues | null = null;

  // Set the initial values for the form depending on the mode
  if (!itemInfo) {
    initialValues = {
      name: '',
      price: '',
      description: '',
      images: [],
    };
  } else {
    initialValues = {
      name: itemInfo.name,
      price: itemInfo.price,
      description: itemInfo.description,
      images: itemInfo.images,
    };
  }

  /**
   * Handle the form submission for creating or editing an item
   * @param values Form values
   */
  const onSubmit = (values: FormValues) => {
    // Create Item
    if (props.mode === 'new') {
      setSubmitLoading(true);
      axios
        .post('/api/items', {
          ...values,
          postedBy: userId,
          category: 'category',
        })
        .then(() => {
          setSubmitLoading(false);
          swal({
            title: 'Success',
            text: 'Item created successfully',
            icon: 'success',
          }).then(() => {
            history.push('/user/items');
          });
        })
        .catch((error) => {
          setSubmitLoading(false);
          swal({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
          });
        });
    } else {
      // Update Item
      setSubmitLoading(true);
      axios
        .patch(`/api/items/${itemId}`, values)
        .then(() => {
          setSubmitLoading(false);
          swal({
            title: 'Success',
            text: 'Item updated successfully',
            icon: 'success',
          }).then(() => {
            history.push('/user/items');
          });
        })
        .catch((error) => {
          setSubmitLoading(false);
          swal({
            title: 'Error',
            text: error.response.data.message,
            icon: 'error',
          });
        });
    }
  };

  /**
   * Handle the return action
   * @param imageUrls The list of image urls that has been uploaded
   * @param isModified Indicates whether the form has been modified
   */
  const returnHandler = (imageUrls: string[], isModified: boolean) => {
    if (isModified) {
      swal({
        title: 'Warning',
        text: 'You have unsaved changes. Are you sure you want to leave?',
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
      }).then((willLeave) => {
        if (willLeave) {
          swal({
            title: 'Info',
            text: 'Deleting Images...',
            icon: 'info',
          });

          // The user has confirmed that they want to leave without saving images that have been uploaded to the server, we need to delete them to prevent orphan images and waste of space
          const promises = imageUrls.map((imageUrl) => {
            const imageName = imageUrl.split('/').pop();
            const imageId = imageName!.split('.')[0];
            return axios.delete(`/api/images/${imageId}`);
          });

          Promise.all(promises).then(() => {
            history.goBack();
          });
        }
      });
    } else {
      history.goBack();
    }
  };

  const deleteItemHandler = () => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to delete this item?',
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
    }).then((willDelete) => {
      if (willDelete) {
        setDeleteLoading(true);

        // Delete the item's images
        const promises = itemInfo.images.map((imageUrl: string) => {
          const imageName = imageUrl.split('/').pop();
          const imageId = imageName!.split('.')[0];
          return axios.delete(`/api/images/${imageId}`);
        });

        Promise.all(promises);

        // Delete the item in the database
        axios
          .delete(`/api/items/${itemId}`)
          .then(() => {
            setDeleteLoading(false);
            swal({
              title: 'Success',
              text: 'Item deleted successfully',
              icon: 'success',
            }).then(() => {
              history.push('/user/items');
            });
          })
          .catch((error) => {
            setDeleteLoading(false);
            swal({
              title: 'Error',
              text: error.response.data.message,
              icon: 'error',
            });
          });
      }
    });
  };

  return (
    <main className='manage-item__container'>
      <WavyDivider position='top' />
      <ManageItemForm
        itemId={itemId}
        mode={props.mode}
        initialValues={initialValues!}
        onSubmit={onSubmit}
        onReturn={returnHandler}
        onDelete={deleteItemHandler}
        submitLoading={submitLoading}
        deleteLoading={deleteLoading}
      />
    </main>
  );
}
