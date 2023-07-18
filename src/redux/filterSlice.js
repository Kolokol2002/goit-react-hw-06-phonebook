const { createSlice } = require('@reduxjs/toolkit');

const filterInitialState = '';

const filterSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    setValueFilter(state, action) {
      state = action.payload;
    },
  },
});

export const { setValueFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
