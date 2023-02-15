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

const bookSlice = createSlice({
  name: 'book',
  initialState: { books: [], isLoading: false, error: null },
  reducers: {},
  extraReducers(builder) {
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
  },
});

export const bookReducer = bookSlice.reducer;
