import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basket: [],
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addBasket: (state, action) => {
      state.basket=[...state.basket,action.payload];
    },
    incBasketElem: (state, action) => {
      state.basket.map(item=>{
        if(item.data.id==action.payload){
          item.quantity+=1
        }
      })
    },
    decBasketElem: (state, action) => {
      state.basket.map(item=>{
        if(item.data.id==action.payload){
          item.quantity-=1
        }
      })
    },
    deleteBasketElem: (state, action) => {
      let idx = state.basket.findIndex(x=>x.data.id===action.payload)
      state.basket.splice(idx,1)
    },
  },
});

export const { incBasketElem, decBasketElem, deleteBasketElem, addBasket } = basketSlice.actions;

export default basketSlice.reducer;