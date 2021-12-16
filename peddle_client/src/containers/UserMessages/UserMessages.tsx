import { State } from "../../store";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChatByUser } from "../../features/chat/userMessagesSlice";
import { useEffect } from "react";
import { ChatTile } from "../../components/Chat/ChatTile";

export default function UserMessages() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { userMessages } = useSelector((state: State) => state.userMessages);
  function routeChange(chatid: string) {
    history.push({ pathname: "/chat-screen", state: { chat: chatid } });
  }

  useEffect(() => {
    if (userMessages.length === 0) {
      dispatch(getChatByUser());
    }
    return () => {};
  }, []);

  return (
    <main>
      <div className="container">
        <section className="my-items__header">
          <i className="bx bx-left-arrow-alt" onClick={history.goBack} />
          <div className="my-items__title">My Messages</div>
        </section>
        {userMessages.length !== 0 && (
          <div className="my-chats_chat-list">
            {userMessages?.map((chat) => (
              <div
                key={chat.id}
                className="btn btn-secondary home__btn home__btn--option"
                onClick={() => routeChange(chat.id)}
              >
                <ChatTile key={chat.id} chat={{ ...chat }} />
              </div>
            ))}
          </div>
        )}
        {userMessages.length === 0 && (
          <div className="noChat">No Recent Chats</div>
        )}
      </div>
      <NavBar />
    </main>
  );
}
