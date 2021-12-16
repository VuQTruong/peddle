import { State } from "../../store";
import NavBar from "../../components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getChatByUser } from "../../features/chat/userMessagesSlice";
import { useEffect, useState } from "react";
import { ChatTile } from "../../components/Chat/ChatTile";
import axios from "axios";
import { Chat } from "../../types/chat";

type ResponseType = {
  status: string;
  message: string;
  data: {
    chatForUser: [];
  };
};

export default function UserMessages() {
  const history = useHistory();
  const dispatch = useDispatch();
  //const { userMessages } = useSelector((state: State) => state.userMessages);
  const { id } = useSelector((state: State) => state.user.userInfo);
  const [chats,setChats] = useState<Chat[]>([])
  function routeChange(chatid: string) {
    history.push({ pathname: "/chat-screen", state: { chat: chatid } });
  }

  useEffect(() => {
    fetchChatFromDb();
 
  }, []);

  const fetchChatFromDb = async () => {
    try {
      const itemRes = await axios.get<ResponseType>(
        `/api/chat/user/${id}`
      );
      
      setChats(itemRes.data.data.chatForUser)
    } catch (error: any) {
      //return rejectWithValue(error.response.data);
    }

  }

  return (
    <main>
      <div className="container">
        <section className="my-items__header">
          <i className="bx bx-left-arrow-alt" onClick={history.goBack} />
          <div className="my-items__title">My Messages</div>
        </section>
        {chats.length !== 0 && (
          <div className="my-chats_chat-list">
            {chats?.map((chat) => (
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
        {chats.length === 0 && (
          <div className="noChat">No Recent Chats</div>
        )}
      </div>
      <NavBar />
    </main>
  );
}
