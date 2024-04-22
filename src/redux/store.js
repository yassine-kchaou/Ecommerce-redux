import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from "../features/articleSlice"
import scategoriesReducer from '../features/scategorieSlice'

import cartSliceReducer from '../features/cartSlice'
import authReducer from "../features/AuthSlice"
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import categoriesReducer from '../features/categoriesSlice'
// import thunk from 'redux-thunk'; zeyed 
const persistConfig = {
    key: 'root',
    version : 1,
    storage,
}
const persistReducer1 = persistReducer(persistConfig,authReducer)
const store = configureStore({
reducer: {
storearticles:articlesReducer,
auth:persistReducer1,
storecategories:categoriesReducer,
storescategories: scategoriesReducer,
storecart:cartSliceReducer

},
// middleware : [thunk]
})
export default store