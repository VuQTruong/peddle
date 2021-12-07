import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';


import axios from 'axios';
import { Item } from '../../types/item';
import { User } from '../../types/user';
import { useHistory } from 'react-router';
import { SoldItemTile } from '../../components/SellHistory/SoldItemTile';

interface ItemWithSellerName extends Item{
  buyerName: string;
}

export default function PurchaseHistory() {

    const [soldItems, setSoldItems] = useState<ItemWithSellerName[]>([]);
    const history = useHistory();

    useEffect(() => {
        fetchSellHistory();
    },[])

    const fetchSellHistory = async() =>{
        const res  = await axios.get<{data:{items: ItemWithSellerName[]}}>('/api/users/sold-items');
        for(let p of res.data.data.items) {
            const user = await axios.get<{data: {user: User}}>(`api/users/${p.purchasedBy}`)
            p.buyerName = formatName(user.data.data.user);
        }
        setSoldItems(res.data.data.items);
    }
    const formatName = (user: User) =>{
        const firstName = user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1);
        const lastName = user.lastName.charAt(0).toUpperCase() + user.lastName.slice(1);
        return `${firstName} ${lastName}`;
      }
    return (
         <main>
            <div className="container">
                <section className='my-items__header'>
                    <i className='bx bx-left-arrow-alt' onClick={history.goBack} />
                    <div className="my-items__title">My Sell History</div>
                </section>
                {soldItems?.map(e => {return  <SoldItemTile key={e.id} item={e} />})}
            </div>
            <NavBar />
        </main>
    );
  }