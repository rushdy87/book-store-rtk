import { configureStore } from '@reduxjs/toolkit';

import { bookReducer } from './bookSlice';
import { authReducer } from './authSlice';
import { reportReducer } from './reportSlice';

export const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    report: reportReducer,
  },
});
