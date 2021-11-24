import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Chat } from '../../types/chat';

export const ChatTile = (props: { chat: Chat }) => {
  const [title, setTitle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  // let title = "";
  useEffect(() => {
  axios
  .get(`/api/users/${props.chat.sender}`)
  .then(({ data }: any) => {
    setTitle(data.data.user.firstName);
    setIsLoading(false);
  });
})
  const chat = props.chat;
  

  return (
    <div className='item-list-card__container'>
        {/* <div className='item-list-card__image'>
            <img  alt={`${title}`} src={chat.sender.photo} />
        </div> */}
        <div className='item-list-card__content'> 

              <div style={{display: 'flex', flexDirection:'row'}}>
                <p>{title}</p>
              </div>
            
            <div style={{display:'flex', flexDirection:'row'}}>
              <p>{chat.messages[chat.messages.length - 1].chat}</p>
            </div>
            <div style={{display:'flex', flexDirection:'row'}}>
              <p>{chat.messages[chat.messages.length - 1].time.substring(11,16)}</p>
            </div>
        </div>
    </div>
  );
};
