import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import teacherReducer from './teacher/teacherSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({teacher: teacherReducer})
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
//   middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
//     serializableCheck: false
//   }),
});

export const persistor = persistStore(store);