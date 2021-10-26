export const addItem = (item:any) => {
  return {
    type: 'ADDITEM',
    payload: item
  };
};

export const incrementTest = () => {
  return {
    type: 'TEST',
  };
};