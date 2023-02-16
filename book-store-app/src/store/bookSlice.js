import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logInsert } from './reportSlice';

export const fetchBooks = createAsyncThunk(
  'book/fetchBooks',
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await fetch('http://localhost:3005/books');
      return result.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const insertBook = createAsyncThunk(
  'book/insertBook',
  async (data, thunkAPI) => {
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    try {
      data.userName = getState().auth.name;
      const result = await fetch('http://localhost:3005/books', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(logInsert({ name: 'insertBook', status: 'success' }));
      return result.json();
    } catch (error) {
      dispatch(logInsert({ name: 'insertBook', status: 'faild' }));
      return rejectWithValue(error);
    }
  }
);

export const removeBook = createAsyncThunk(
  'book/removeBook',
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      await fetch(`http://localhost:3005/books/${book.id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return book;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const bookSlice = createSlice({
  name: 'book',
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  extraReducers(builder) {
    // Fetch Books
    builder.addCase(fetchBooks.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });

    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Insert Book
    builder.addCase(insertBook.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(insertBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books.push(action.payload);
    });

    builder.addCase(insertBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    // Remove Book
    builder.addCase(removeBook.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(removeBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = state.books.filter((book) => book.id !== action.payload.id);
    });

    builder.addCase(removeBook.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const bookReducer = bookSlice.reducer;
