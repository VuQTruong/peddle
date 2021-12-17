import { State } from "../../store";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import swal from "sweetalert";
import swal2 from "sweetalert2";
import { isURL } from "../../utilities/validators";
import Loader from "react-loader-spinner";
import Rating from "react-rating";
import { getChatByUser } from "../../features/chat/userMessagesSlice";
import { Item } from "../../types/item";

import { formatCurrency } from '../../utilities/utils';
import { removeFavItem } from "../../features/user/userFavoritesSlice";


export default function ChatScreen(props: {
  location: { state: { chat: string } };
}) {
  const user = useSelector((state: State) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const onChangeHandler = (event: { target: { value: any } }) => {
    setMessage(event.target.value);
  };

  const submitReq = () => {
    let date: Date = new Date();
    chatInfo.messages.push({
      userId: user.userInfo.id,
      chat: messageToSend,
      time: date,
    });
    axios
      .patch(`/api/chat/${chatId}`, {
        itemId: chatInfo.itemId,
        sender: chatInfo.sender,
        receiver: chatInfo.receiver,
        isBlocked: chatInfo.isBlocked,
        blockedByUserId: chatInfo.blockedByUserId,
        messages: chatInfo.messages,
      })
      .then(({ data }: any) => {
        setChatInfo(data.data.chat);
        setMessage("");
        dispatch(getChatByUser());
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const rateUser = () => {
    userRatingBool ? setUserRatingBool(false) : setUserRatingBool(true);
  };

  const updateRating = (value: any) => {
    axios
      .post(`/api/users/${userInfo.id}/rating/${value}`)
      .then(({ data }: any) => {
        setUserInfo(data.data.user);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });

    setUserRatingBool(false);
  };

  const removeItemHandler = (id: string) => {
    swal({
      title: 'Warning',
      text: 'Are you sure you want to remove this item from your cart?',
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
    }).then(async (willDelete) => {
      if (willDelete) {
        const result: any = await dispatch(removeFavItem(id));

        // Delete chat
        await axios.delete(`/api/chat/${chatId}`, {})
 
        if (result.meta.requestStatus === 'fulfilled') {
          swal({
            title: 'Success',
            text: 'Item removed successfully',
            icon: 'success',
          });

          // redirect
          history.goBack();
          
        } else if (result.meta.requestStatus === 'rejected') {
          swal({
            title: 'Error',
            text: result.payload,
            icon: 'error',
          });
        }
      }
    });
  };

  const onShowDetails = () => {
    swal2.fire({
      title: `${item?.name}`,
    
      html: `<p>${item?.description}</p> <br> <img src="${item?.images[0]}" style='width:150px; display: block;
      margin-left: auto;
      margin-right: auto;'>`,
      
    })
  }


  const blockUser = () => {
    if (!chatInfo.isBlocked) {
      swal({
        title: "Block User",
        text: "Are you sure you want to block this user?",
        icon: "warning",
        dangerMode: true,
        buttons: {
          deny: {
            text: "Cancel",
            value: null,
          },
          confirm: {
            text: "Yes",
            value: true,
          },
        },
      }).then((value) => {
        if (value) {
          chatInfo.isBlocked = true;
          chatInfo.blockedByUserId = user.userInfo.id;

          axios
            .patch(`/api/chat/${chatId}`, {
              itemId: chatInfo.itemId,
              sender: chatInfo.sender,
              receiver: chatInfo.receiver,
              isBlocked: chatInfo.isBlocked,
              blockedByUserId: chatInfo.blockedByUserId,
              messages: chatInfo.messages,
            })
            .then(({ data }: any) => {
              setChatInfo(data.data.chat);
              setMessage("");
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        }
      });
    } else {
      swal({
        title: "Unblock User",
        text: "Are you sure you want to unblock this user?",
        icon: "warning",
        dangerMode: true,
        buttons: {
          deny: {
            text: "Cancel",
            value: null,
          },
          confirm: {
            text: "Yes",
            value: true,
          },
        },
      }).then((value) => {
        if (value) {
          chatInfo.isBlocked = false;
          chatInfo.blockedByUserId = null;

          axios
            .patch(`/api/chat/${chatId}`, {
              itemId: chatInfo.itemId,
              sender: chatInfo.sender,
              receiver: chatInfo.receiver,
              isBlocked: chatInfo.isBlocked,
              blockedByUserId: chatInfo.blockedByUserId,
              messages: chatInfo.messages,
            })
            .then(({ data }: any) => {
              setChatInfo(data.data.chat);
              setMessage("");
            })
            .catch((error) => {
              console.log(error.response.data.message);
            });
        }
      });
    }
  };

  const chatId = props.location.state.chat;

  const [userInfo, setUserInfo] = useState<any>(null);
  const [messageToSend, setMessage] = useState<any>("");
  const [chatInfo, setChatInfo] = useState<any>(null);
  const [item, setItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRatingBool, setUserRatingBool] = useState(false);

  useEffect(() => {
    if (chatInfo === null) {
      axios.get(`/api/chat/${chatId}`).then(({ data }: any) => {
        setChatInfo(data.data.chats);
      });
    }

    if (chatInfo) {
      if (item === null) {
        axios.get(`/api/items/${chatInfo.itemId}`).then(({ data }: any) => {
          setItem(data.data.item);
          console.log(data)
        });
      }

      if (userInfo === null) {
        if (chatInfo.sender === user.userInfo.id) {
          axios.get(`/api/users/${chatInfo.receiver}`).then(({ data }: any) => {
            setUserInfo(data.data.user);
            setIsLoading(false);
          });
        } else {
          axios.get(`/api/users/${chatInfo.sender}`).then(({ data }: any) => {
            setUserInfo(data.data.user);
            setIsLoading(false);
          });
        }
      }
    }
    return () => {};
  });
  return isLoading ? (
    <div className="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  ) : (
    <main>
      <div className="container">
        <section className="my-items__header">
          <i className="bx bx-left-arrow-alt" onClick={history.goBack} />

          <div className="my-chat-title">Message to: {userInfo.firstName} {userInfo.lastName}</div>
          {chatInfo.blockedByUserId &&
            chatInfo.blockedByUserId === user.userInfo.id && (
              <i id="block" className="bx bxs-user-x" onClick={blockUser} />
            )}
          {!chatInfo.blockedByUserId && (
            <i id="block" className="bx bxs-user-x" onClick={blockUser} />
          )}
          {!chatInfo.blockedByUserId && (
            <i id="userRating" className="bx bx-star" onClick={rateUser} />
          )}
        </section>
        {userRatingBool && (
          <div className="rateUser">
            Rate {userInfo.firstName} :&nbsp;&nbsp;
            <Rating
              emptySymbol="bx bx-star"
              fullSymbol="bx bxs-star"
              initialRating={userInfo.rating}
              onClick={updateRating}
            />
          </div>
        )}
        <div className='chat__cart__item' key={item?.id}>
          <img
            className='chat__item__img'
            src={item?.images[0]}
            alt={item?.name}
          />
          <div className='chat__item__info'>
            <div className='chat__item__header'>
              <p className='chat__item__title'>{item?.name}</p>
            </div>
            <div className='chat__item__price'>
              ${item?.price}
            </div>
            <button className="chat__item__btn" onClick={onShowDetails}> View item details</button>
          </div>
          <button
            type='button'
            className='chat__item__remove-btn'
            onClick={() => removeItemHandler(item!!.id)}
          >
            ✖
          </button>
        </div>
        <div id="chatList" className="my-chat-list">
          {chatInfo.messages?.map((message: any) =>
            message.userId === user.userInfo.id ? (
              <div className="chat-by-you" key={message._id}>
                {message.chat}
                <Avatar
                  className="chat__user-avatar-right"
                  name={`${user.userInfo.firstName} ${user.userInfo.lastName}`}
                  round={true}
                  size="30"
                  textSizeRatio={1}
                  src={isURL(user.userInfo.photo) ? user.userInfo.photo : ""}
                />
              </div>
            ) : (
              <div className="chat_by_other_user" key={message._id}>
                <Avatar
                  className="chat__user-avatar-left"
                  name={`${userInfo.firstName} ${userInfo.lastName}`}
                  round={true}
                  size="30"
                  textSizeRatio={1}
                  src={isURL(userInfo.photo) ? userInfo.photo : ""}
                />
                {message.chat}
              </div>
            )
          )}
        </div>
        <div>
          {chatInfo?.isBlocked && (
            <div className="blockedMsg">This conversation is blocked</div>
          )}
          {!chatInfo?.isBlocked && (
            <div className="form__control--text chat_box">
              
              <input
                type="text"
                id="textToSend"
                value={messageToSend}
                onChange={onChangeHandler}
                placeholder="Send a message"
              />
              <i
                id="send"
                onClick={() => submitReq()}
                className="bx bx-right-arrow-alt"
              />
            </div>

          )}
        </div>
      </div>
      <NavBar />
    </main>
  );
}
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
