import { State } from "../../store";
import NavBar from "../../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "react-avatar";
import swal from "sweetalert";
import { isURL } from "../../utilities/validators";
import Loader from "react-loader-spinner";

export default function ChatScreen(props: {
  location: { state: { chat: string } };
}) {
  const user = useSelector((state: State) => state.user);
  const history = useHistory();
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
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

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
  const [itemName, setItemName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  //const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (chatInfo === null) {
      axios.get(`/api/chat/${chatId}`).then(({ data }: any) => {
        setChatInfo(data.data.chats);
      });
    }

    if (chatInfo) {
      if (itemName === null) {
        axios.get(`/api/items/${chatInfo.itemId}`).then(({ data }: any) => {
          setItemName(data.data.item.name);
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
    return () => {
      //   setChatInfo(null);
      //   setItemName(null);
      //   setUserInfo(null);
      //   setIsLoading(true);
    };
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
          <div className="my-items__title">{itemName}</div>
          {chatInfo.blockedByUserId &&
            chatInfo.blockedByUserId === user.userInfo.id && (
              <i id="block" className="bx bx-user-minus" onClick={blockUser} />
            )}
          {!chatInfo.blockedByUserId && (
            <i id="block" className="bx bx-user-minus" onClick={blockUser} />
          )}
        </section>
        <div className="my-chat-list">
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
            <div className="form__control--text">
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
