import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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
  'book/insertBooks',
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await fetch('http://localhost:3005/books', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      return result.json();
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
  },
});

export const bookReducer = bookSlice.reducer;
