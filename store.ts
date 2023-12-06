/* eslint-disable no-trailing-spaces */
import {configureStore} from '@reduxjs/toolkit';
import {themeSlice} from './src/redux/reducers/themeSlice';
import {noteSlice} from './src/redux/reducers/noteSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
    notes: noteSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
