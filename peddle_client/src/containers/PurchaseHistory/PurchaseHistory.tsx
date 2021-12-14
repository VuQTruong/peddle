import NavBar from '../../components/NavBar/NavBar';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { Item } from '../../types/item';
import { PurchasedItemTile } from '../../components/PurchaseHistory/PurchasedItemTile';
import { User } from '../../types/user';
import { useHistory } from 'react-router-dom';

interface ItemWithSellerName extends Item{
  sellerName: string;
}

export default function PurchaseHistory() {
    const history = useHistory();
    const [purchased, setPurchased] = useState<ItemWithSellerName[]>();

    useEffect(() => {
        fetchPurchaseHistory();
    },[])

    const fetchPurchaseHistory = async() =>{
        const res  = await axios.get<{data:{items: ItemWithSellerName[]}}>('/api/users/purchased-items');
        for(let p of res.data.data.items) {
            const user = await axios.get<{data: {user: User}}>(`/api/users/${p.postedBy}`)
            p.sellerName = formatName(user.data.data.user);
        }
        setPurchased(res.data.data.items);
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
                    <div className="my-items__title">My Purchase History</div>
                </section>
                {purchased?.map(e => {return  <PurchasedItemTile key={e.id} item={e} />})}
            </div>
            <NavBar />
        </main>
    );
  }