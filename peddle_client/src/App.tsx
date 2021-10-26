import React, { useEffect, useRef, useState, useReducer, Component } from 'react';
import logo from './logo.svg';
import faker from "faker";

import { useSwipeable } from 'react-swipeable';
import SwipeableHook from './SwipeableHook';
import onSwiped from "react-swipeable";
import './App.css';
import { isMetaProperty } from 'typescript';

import { useSelector, useDispatch } from 'react-redux';
import { addItem, incrementTest } from './actions';


//* Constants */
const SPACING = 20;
const DIRECTIONS = ['Left', 'Right', 'Up', 'Down'];

const ITEM_TOP = 16.800003051757812; //! Dependant on Item padding
const ITEM_HEIGHT = 702;
const ITEM_WIDTH = 392;

const SCROLL_SPEED = 5;
const ITEM_ROTATION = 25;

const dispatch = useDispatch();

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

const initialState = {
  swiping: false,
  swiped: false,
  tapped: false,
  swipingDirection: '',
  swipedDirection: ''
};
const initialStateSwipeable = {
  delta: '10',
  preventDefaultTouchmoveEvent: true,
  trackMouse: false,
  trackTouch: true,
  rotationAngle: 0,
};
const initialStateApplied = {
  showOnSwipeds: false,
  onSwipingApplied: true,
  onSwipedApplied: true,
  onTapApplied: true,
  onSwipedLeftApplied: true,
  onSwipedRightApplied: true,
  onSwipedUpApplied: true,
  onSwipedDownApplied: true,
};

interface IState {
  swiping: boolean;
  swiped: boolean;
  tapped: boolean;
  swipingDirection: string;
  swipedDirection: string;
  delta: string;
  preventDefaultTouchmoveEvent: boolean;
  trackMouse: boolean;
  trackTouch: boolean;
  rotationAngle: number | string;
  showOnSwipeds: boolean;
  onSwipingApplied: boolean;
  onSwipedApplied: boolean;
  onTapApplied: boolean;
  onSwipedLeftApplied: boolean;
  onSwipedRightApplied: boolean;
  onSwipedUpApplied: boolean;
  onSwipedDownApplied: boolean;
}

function getBoundSwipes(component: any) {
  let boundSwipes = {};
  DIRECTIONS.forEach((dir)=>{
    if (component.state[`onSwiped${dir}Applied`]) {
      // @ts-ignore
      boundSwipes[`onSwiped${dir}`] = component.onSwipedDirection.bind(component, dir);
    }
  });
  return boundSwipes;
}

function getVal(e: any) {
  return e.target.value;
}

class Main extends Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = Object.assign({}, initialState, initialStateSwipeable, initialStateApplied);
    this.updateValue = this.updateValue.bind(this);
  }

  resetState(resetAll?: boolean) {
    if (resetAll) {
      this.setState(Object.assign({}, initialState, initialStateSwipeable, initialStateApplied));
    } else {
      this.setState(initialState);
    }
  }


  setDisplayNoneHiddenItems() {
    for (let i = 0; i < RAND_DATA.length; i++)
    {
      if (document.getElementById(`item-${(i)}`)?.style.visibility === "hidden" && document.getElementById(`item-${(i)}`)?.style.display !== "none")
      {
        console.log(`setting item-${(i)} display = none`);
        document.getElementById(`item-${(i)}`)!.style.display = "none";
      }
    }
  }


  onSwiping(args: any) {
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
      
    this.setState({
      swiping: true,
      swiped: false,
      swipingDirection: args.dir,
    });
  }

  onTap(args: any) {
    //console.log('tap args: ', args)
    console.log(CURR_ITEM_IDX);
    //let item = document.getElementById(`item-${(CURR_ITEM_IDX)}`);
    //let pos = item?.getBoundingClientRect();
    //console.log(useSelector((state:any) => state.ItemCartReducer))
    //console.log(pos?.top);

    dispatch(incrementTest());

    //indow.scrollBy(0,50);

    this.setState({
      swiping: false,
      swiped: false,
      tapped: true
    })
  }

  onSwiped(args: any) {
 
    let item = document.getElementById(`item-${(CURR_ITEM_IDX)}`);
 
    if (item !== null) {
      if (args.deltaX > 350) {
        //! Add item to cart
        console.log("Adding Item")
        
        console.log(RAND_DATA[CURR_ITEM_IDX])
        dispatch(addItem(RAND_DATA[CURR_ITEM_IDX]));


        item.style.visibility = "hidden";
        this.scrollNextItem();
      }
      else if (args.deltaY > 500) {
        this.scrollPrevItem()
      }
      else if (args.deltaY < -500) {
        this.scrollNextItem()
      }
      else {
        item.style.transition =  'transform 0.5s';
        console.log("HERE")
        document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
      }
    }

    this.setState({
      swiped: true,
      swiping: false,
    });
  }


  onSwipedDirection(direction: any) {
    this.setState({
      swipedDirection: direction,
    });
  }

  updateValue(type: string, value: any) {
    console.log("update value called");
    // @ts-ignore
    this.setState({ [type]: value, });
  }

  _renderAppliedDirRow(dir: string) {
    // @ts-ignore
    const checked = this.state[`onSwiped${dir}Applied`];
    // @ts-ignore
    const cssJs = {color: this.state[`onSwiped${dir}Applied`] ? '#000000' : '#cccccc'}
    return (
      <tr key={`appliedDirRow${dir}`}>
        <td className="text-center">
          <input type="checkbox" style={{margin: "0"}} checked={checked}
            onChange={(e)=>this.updateValue(`onSwiped${dir}Applied`, e.target.checked)} />
        </td>
        <td style={cssJs}>{dir}</td>
      </tr>
    )
  }

 /*  getItemID(idx: number) {
    if (RAND_DATA[idx] !== undefined)
      return RAND_DATA[idx].key;
  } */

  scrollNextItem() {
    CURR_ITEM_IDX++;

    while (document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.style.visibility === "hidden") {
      CURR_ITEM_IDX++;
    }

    document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  scrollPrevItem() {
    CURR_ITEM_IDX--;

    while (document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.style.visibility === "hidden") {
      CURR_ITEM_IDX--;
    }

    document.getElementById(`item-${(CURR_ITEM_IDX)}`)?.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
  }

  
  ScrollToNextItem = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && CURR_ITEM_IDX < RAND_DATA.length)
      this.scrollNextItem();
    else if (CURR_ITEM_IDX > 0)
      this.scrollPrevItem();
  }


  render() {
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
    } = this.state;

    const isDeltaNumber = !(isNaN(delta as any) || delta === '');
    const isRotationAngleNumber = !(isNaN(rotationAngle as any) || rotationAngle === '');
    const deltaNum = isDeltaNumber ? +delta : 10;
    const rotationAngleNum = isRotationAngleNumber ? +rotationAngle : 0;

    const swipeableStyle = {fontSize: "0.75rem"};

    const boundSwipes = getBoundSwipes(this);
    let swipeableDirProps: any = {};
    if (onSwipingApplied) {
      // @ts-ignore
      swipeableDirProps.onSwiping = (...args: any)=>this.onSwiping(...args);
    }
    if (onSwipedApplied) {
      // @ts-ignore
      swipeableDirProps.onSwiped = (...args: any)=>this.onSwiped(...args);
    }
    if(onTapApplied) {
      // @ts-ignore
      swipeableDirProps.onTap = (...args: any) => this.onTap(...args);
    }


    


    return (
      <div className="row">
        <div className="small-12 column">
            <SwipeableHook
            {...boundSwipes}
            {...swipeableDirProps}
            delta={deltaNum}
            preventDefaultTouchmoveEvent={preventDefaultTouchmoveEvent}
            trackTouch={trackTouch}
            trackMouse={trackMouse}
            rotationAngle={rotationAngleNum}
            className="callout hookComponent"
            style={swipeableStyle}>
               <header className="App-header" onWheel = {(e) => this.ScrollToNextItem(e)}>
                {
                  RAND_DATA.map((item, i) => (
                    <div key={i} className="Item" id={`item-${i}`} style={{padding: SPACING, marginBottom: SPACING, borderRadius: 12}}>
                      <img src={item.image} alt="img" />
                      <div className="Item-text">
                        <h2>{item.name}</h2>
                        <h2>${item.price}</h2>
                        <h4>{item.description}</h4>
                        <h6>Sold By: {item.seller}</h6>
                      </div>
                    </div>
                  ))
                }
                </header>
          </SwipeableHook>
        </div>
      </div>
    )
  }
}


 
function App() {
  return <Main />
}

export default App;
