const initialState = {
  items: [] as any
}

const ItemCartReducer = (state:any = initialState, action: any) => {
  console.log("here");
  switch(action.type) {
    case 'ADDITEM':
      state.items.push(action.payload);
      return state; 
      //return { ...state, items: [action.payload, ...state.items] };
    default:
      return state;
  }
}

export default ItemCartReducer;