import {createSlice, nanoid} from "@reduxjs/toolkit";

const initialState = {
    products: [{
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
        discount: "",
        created_at: "",
        image: ""
    }],
    filter: [{
        name: "",
        price: "",
        quantity: "",
        description: "",
        category: "",
        discount: "",
        created_at: ""
    }],
    cart_items: [{
        items: 0,
    }]
}

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        add_pro: (state, action)=> {
           let totalPro = action.payload;
           totalPro.forEach(element => {
                element['nanoid'] = nanoid();
           });
           state.products = totalPro;
        },
        delete_pro: (state, action)=>{
            let products = state.products;
            let id = action.payload.id;
            state.products = products.filter((pro)=>{
                return pro.id != id;
            })
        },
        update_pro: (state, action)=>{
            
        },
        filter_pro: (state, action)=>{
            let arr = state.products.filter((st)=>{
                return st.name.indexOf(action.value);
            })
            state.filter = arr;
        },
        add_cart: (state, action) =>{
            state.cart_items[0].items = action.payload.items;
        }
    }
});

export const {add_pro, delete_pro, update_pro, filter_pro, add_cart} = productsSlice.actions;

export default productsSlice.reducer;