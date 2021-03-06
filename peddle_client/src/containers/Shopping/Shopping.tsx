
//! Install 
//?  react-swipeable
//?  faker & @types/faker

import React, { useEffect, useRef, useState, useReducer, Component } from 'react';
import faker from "faker";
import SwipeableHook from './SwipeableHook';
import NavBar from '../../components/NavBar/NavBar';
import Avatar from "react-avatar";

import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { State } from '../../store';
import { Item } from '../../types/item';
import { fetchMyItems } from '../../features/user/userItemsSlice';
import axios from 'axios';
import { User } from '../../types/user';
import { type } from 'os';
import Loader from 'react-loader-spinner';
import { isURL } from '../../utilities/validators';




//* Constants */
const SPACING = 20;
const SCROLL_SENSITIVITY = 400;
const ITEM_ROTATION = 25;

let CURR_ITEM_IDX = 0;

//* Faker Data Generation */
faker.seed(faker.datatype.number());
const RAND_DATA = Array.from(Array(20).keys()).map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    //image: faker.random.image(),
    image: `https://picsum.photos/id/${faker.datatype.number({'min':1,'max':300})}//200/200`,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    seller: faker.name.findName(),
  }
});

const ITEM_DATA: Item[] = []

const initialState = {
  swiping: false,
  swiped: false,
  tapped: false,
  swipingDirection: '',
  swipedDirection: '',
  delta: '10',
  preventDefaultTouchmoveEvent: true,
  trackMouse: false,
  trackTouch: true,
  rotationAngle: 0,
  showOnSwipeds: false,
  onSwipingApplied: true,
  onSwipedApplied: true,
  onTapApplied: true,
  onSwipedLeftApplied: true,
  onSwipedRightApplied: true,
  onSwipedUpApplied: true,
  onSwipedDownApplied: true,
};

function Main() {
  //const dispatch = useDispatch();
  //const cart = useSelector((state:any) => state.ItemCartReducer);
  const reducer = (state:any, newState:any) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);
  const {userInfo} = useSelector((state:State) => state.user)

  const [isLoading, setIsLoading] = useState(true);

  // Get items
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    fetchMyItems();
  }, []);

  const fetchMyItems = async () => {
    try {
      const itemsLocal = await axios.get<{ data: {items: Item[]}}>(
        `/api/items`
      )

      setItems(itemsLocal.data.data.items)

      // Clear Items
      ITEM_DATA.length = 0

      itemsLocal.data.data.items.map((i) => {
        ITEM_DATA.push(i)
      })

      for (const item of ITEM_DATA) {
        const sellerData = await axios.get<{ data: {user: User}}>(
          `/api/users/${item.postedBy}`
        )

        const seller  = sellerData.data.data.user

        item.postedBy = {
          id: seller.id,
          firstName: seller.firstName,
          lastName: seller.lastName,
          photo: seller.photo,
          email: seller.email,
          postalCode: seller.postalCode
        } 
      }
    } catch (error: any) {
      console.log(error);
    }
    setIsLoading(false)
  }



  const onSwiping = (args: any) => {
    let item = document.getElementById(`item-${(CURR_ITEM_IDX)}`);
    let pos = item?.getBoundingClientRect();
    if (item !== null && pos !== null) {
      item!.style.transition =  '';
      item.style.position = "relative";
      if (args.dir === "Right") {

          item.style.transform = `translateX(${args.deltaX}px) rotate(${args.deltaX / ITEM_ROTATION}deg)`;
      } else if (args.dir === "Left") {
        //
      } else if (args.dir === "Up") {
        window.scroll({behavior: 'smooth'});
        window.scrollBy(0,-(args.deltaY / 50));
        
      } else if (args.dir === "Down") {
        // DeltaY / Scroll Speed * Height of Item * Index
        window.scroll({behavior: 'smooth'});
        window.scrollBy(0,-(args.deltaY / 50));
      }
    }  
      
    setState({
      swiping: true,
      swiped: false,
      swipingDirection: args.dir,
    });
  }

  

  const onSwiped = (args: any) => {
 
    let item = document.getElementById(`item-${(CURR_ITEM_IDX)}`);

    if (item !== null) {

      if (args.dir === "Right") {
        if (args.deltaX > 350) {
          //dispatch(addItem(RAND_DATA[CURR_ITEM_IDX]));
          item.style.visibility = "hidden";


          let idx = CURR_ITEM_IDX

          //* Add item to Shopping Cart here

          const addItemToCart = async () => {
            await axios.post('/api/users/favourite', {
              itemId: ITEM_DATA[idx].id
            })

            await axios.patch('/api/users/seen-items', {
              itemId: ITEM_DATA[idx].id
            }) 

            await axios.patch(`/api/items/${ITEM_DATA[idx].id}/increment-matches`, {})

            await axios.post('/api/chat', {
              itemId: ITEM_DATA[idx].id,
              sender: userInfo.id,
              receiver: ITEM_DATA[idx].postedBy.id,
              messages: [{userId:userInfo.id,chat:"Hello, is this item still available?"}]
            })
       
          }

          addItemToCart()


          scrollNextItem();
        }
        else {
          item.style.transition =  'transform 0.5s';
          item.style.transform = `translateX(0px) rotate(0deg)`;
        }
      }
      else if (args.dir === "Up" || args.dir === "Down") {
        if (args.deltaY > SCROLL_SENSITIVITY) {
          scrollPrevItem()
        }
        else if (args.deltaY < -SCROLL_SENSITIVITY) {
          scrollNextItem()
        }
        else {
          document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
        }
      }
    }

    setState({
      swiped: true,
      swiping: false,
    });
  }

  //? Mainly used for debugging
  const onTap = (args: any) => {
    //console.log('tap args: ', args)
    //console.log(cart);

    setState({
      swiping: false,
      swiped: false,
      tapped: true
    })
  }

  const scrollNextItem = () => {
    if ((CURR_ITEM_IDX + 1) < ITEM_DATA.length) {
      CURR_ITEM_IDX++;

      while (document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.style.visibility === "hidden") {
        CURR_ITEM_IDX++;
      }
  
      document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
    else {
      document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  }

  const scrollPrevItem = () => {

    if ((CURR_ITEM_IDX - 1) >= 0) {
      CURR_ITEM_IDX--;

      while (document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.style.visibility === "hidden") {
        CURR_ITEM_IDX--;
      }
  
      document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
    else {
      document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }   
  }

  
  const ScrollToNextItem = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && CURR_ITEM_IDX < RAND_DATA.length)
      scrollNextItem();
    else if (CURR_ITEM_IDX > 0)
      scrollPrevItem();
  }
  
  const {
    swiping,
    swiped,
    tapped,
    swipingDirection,
    swipedDirection,
    delta,
    showOnSwipeds,
    onSwipingApplied,
    onSwipedApplied,
    onTapApplied,
    preventDefaultTouchmoveEvent,
    trackTouch,
    trackMouse,
    rotationAngle,
  } = state;

  const isDeltaNumber = !(isNaN(delta as any) || delta === '');
  const isRotationAngleNumber = !(isNaN(rotationAngle as any) || rotationAngle === '');
  const deltaNum = isDeltaNumber ? +delta : 10;
  const rotationAngleNum = isRotationAngleNumber ? +rotationAngle : 0;

  const swipeableStyle = {fontSize: "0.75rem"};

  let swipeableDirProps: any = {};
  if (onSwipingApplied) {
    // @ts-ignore
    swipeableDirProps.onSwiping = (...args: any)=> onSwiping(...args);
  }
  if (onSwipedApplied) {
    // @ts-ignore
    swipeableDirProps.onSwiped = (...args: any)=> onSwiped(...args);
  }
  if(onTapApplied) {
    // @ts-ignore
    swipeableDirProps.onTap = (...args: any) => onTap(...args);
  }

  return  isLoading ? (
    <div className="shopping__loader__container">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
    ) : (
    <div className="row">
      <div className="small-12 column">
        <SwipeableHook
        {...swipeableDirProps}
        delta={deltaNum}
        preventDefaultTouchmoveEvent={preventDefaultTouchmoveEvent}
        trackTouch={trackTouch}
        trackMouse={trackMouse}
        rotationAngle={rotationAngleNum}
        className="callout hookComponent"
        style={swipeableStyle}>
            <header className="App-header" onWheel = {(e) => ScrollToNextItem(e)}>
            {
              ITEM_DATA.map((item, i) => (
                <div key={i} className="Item" id={`item-${i}`} style={{borderRadius: 12}}>
                  <div className='image_container'>
                    <img className="image_item" src={item.images[0]} alt="img" />
                  </div>
                  <h1 className="item_name_price">{item.name}</h1>
                  <div className="price_container">
                    <h2>Price: ${item.price}</h2>
                  </div>
                  <div className="desc_container">
                    <h2>Description</h2>
                    <h3>{item.description}</h3>
                  </div>
                  <div className="seller_container">
                    {/* <div className="shopping__avatar_container"> */}
                      <Avatar
                        className="shopping__user-avatar-right"
                        name={`${item.postedBy.firstName} ${item.postedBy.lastName}`}
                        round={true}
                        size="50"
                        textSizeRatio={1}
                        src={isURL(item.postedBy.photo) ? item.postedBy.photo : ""}
                      />
                    {/* </div> */}
                    {item.postedBy.firstName} {item.postedBy.lastName} | Trusted Seller
                  </div>
                </div>
              ))
            }
            </header>
        </SwipeableHook>
      </div>
      
      <NavBar />
    </div>
  )
  
}


 
function ScrollableList() {
  return <Main />
}

export default ScrollableList;
