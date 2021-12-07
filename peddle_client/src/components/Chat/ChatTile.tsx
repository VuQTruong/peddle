import axios from "axios";
import { useEffect, useState } from "react";
import { Chat } from "../../types/chat";
import Avatar from "react-avatar";
import { isURL } from "../../utilities/validators";
import { useSelector } from "react-redux";
import { State } from "../../store";
import Loader from "react-loader-spinner";

export const ChatTile = (props: { chat: Chat }) => {
  const [title, setTitle] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [itemName, setItemName] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector((state: State) => state.user);
  const userId =
    props.chat.sender.toString() === user.userInfo.id
      ? props.chat.receiver
      : props.chat.sender;
  useEffect(() => {
    if (title === null) {
      axios.get(`/api/users/${userId}`).then(({ data }: any) => {
        setTitle(data.data.user.firstName + " " + data.data.user.lastName);
        setUserInfo(data.data.user);
      });
    }
    if (itemName === null) {
      axios.get(`/api/items/${props.chat.itemId}`).then(({ data }: any) => {
        setItemName(data.data.item.name);
        setIsLoading(false);
      });
    }

    return () => {};
  });
  const chat = props.chat;
  const lastMessageUserId =
    chat.messages[chat.messages.length - 1].userId === user.userInfo.id
      ? "You"
      : userInfo?.firstName;

  return isLoading ? (
    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
  ) : (
    <div className="chat-list-card__container">
      <Avatar
        className="home__user-avatar"
        name={`${userInfo.firstName} ${userInfo.lastName}`}
        round={true}
        size="60"
        textSizeRatio={1}
        src={isURL(userInfo.photo) ? userInfo.photo : ""}
      />
      <div className="chat-list-card__content">
        <div className="chat-list-card__title-div">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>
              {title} | {itemName}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <p>
            {lastMessageUserId}: {chat.messages[chat.messages.length - 1].chat}
          </p>
        </div>
        {/* <div style={{display:'flex', flexDirection:'row'}}>
              <p>{chat.messages[chat.messages.length - 1].time.substring(11,16)}</p>
            </div> */}
      </div>
    </div>
  );
};
